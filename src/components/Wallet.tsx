import { ChainEnum } from '@/config/block-chain/common'
import { wait } from '@/utils/misc'
import { changeChain, getConfig, useConnectWallet } from '@/utils/web3React'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 1rem;
  height: fit-content;
  text-align: center;
  padding: 0;
  border: 0.5px solid #838383;
  padding: 8px;
  border-radius: 8px;

  :hover {
    border-color: #333;
    background-color: rgba(51, 51, 51, 0.1);
  }
`
const Account = styled.div`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
`

function Wallet() {
  const onChange = async (chainName: ChainEnum) => {
    // 二次确认
    await wait(500)
    await changeChain(chainName)
  }
  const { account, active, deactivate } = useWeb3React()
  const { connectWallet } = useConnectWallet(() => onChange(ChainEnum.MUMBAI))
  const { injected } = getConfig(ChainEnum.MUMBAI)
  const accountEllipsis = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null

  if (!active) {
    return (
      <StyledButton type="button" onClick={() => connectWallet(injected)}>
        connect wallet
      </StyledButton>
    )
  }

  return (
    <Account>
      <span>{accountEllipsis}</span>
      <StyledButton type="button" onClick={deactivate}>
        logout
      </StyledButton>
    </Account>
  )
}

export default Wallet
