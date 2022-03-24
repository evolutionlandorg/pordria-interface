import { ChainEnum } from '@/config/block-chain/common'
import { wait } from '@/utils/misc'
import { changeChain, getConfig, useConnectWallet } from '@/utils/web3-react'
import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'

const Account = styled.div`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
`

interface IWalletProps {
  chainID?: number
}

const Wallet: FC<IWalletProps> = ({ chainID }) => {
  const onChange = async (chainName: ChainEnum) => {
    // 二次确认
    await wait(500)
    await changeChain(chainName)
  }
  const { connectWallet, deactivate, account } = useConnectWallet(() => {
    if (chainID) {
      onChange(chainID)
    }
  })
  const injected = useMemo(() => {
    if (chainID) {
      return getConfig(chainID).injected
    }

    return null
  }, [chainID])

  if (!account) {
    return (
      <Button onClick={() => injected && connectWallet(injected)}>
        connect wallet
      </Button>
    )
  }

  const accountEllipsis = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null

  return (
    <Account>
      <span>{accountEllipsis}</span>
      <Button onClick={deactivate}>logout</Button>
    </Account>
  )
}

Wallet.defaultProps = {
  chainID: undefined
}

export default Wallet
