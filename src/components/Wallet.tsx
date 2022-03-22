import { ChainEnum } from '@/config/block-chain/common'
import { wait } from '@/utils/misc'
import { changeChain, getConfig, useConnectWallet } from '@/utils/web3React'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'

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
      <Button onClick={() => connectWallet(injected)}>connect wallet</Button>
    )
  }

  return (
    <Account>
      <span>{accountEllipsis}</span>
      <Button onClick={deactivate}>logout</Button>
    </Account>
  )
}

export default Wallet
