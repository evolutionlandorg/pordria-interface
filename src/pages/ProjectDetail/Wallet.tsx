import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'
import useAuth from '@/hooks/useAuth'
import { ConnectorTypeEnum } from '@/utils/web3-react'
import { size } from '@/styles/variables'

const Account = styled.div`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 1rem;
  font-size: ${size.tn};
`

interface IWalletProps {
  chainID?: number
}

const Wallet: FC<IWalletProps> = ({ chainID }) => {
  const { connectWallet, disconnectWallet, account, setChainID } = useAuth()

  useEffect(() => {
    setChainID(chainID)
  }, [chainID, setChainID])

  if (!account) {
    return (
      <Button large onClick={() => connectWallet(ConnectorTypeEnum.INJECTED)}>
        connect wallet
      </Button>
    )
  }

  const accountEllipsis = `${account.substring(0, 6)}...${account.substring(
    account.length - 4
  )}`

  return (
    <Account>
      <span>{accountEllipsis}</span>
      <Button onClick={disconnectWallet}>logout</Button>
    </Account>
  )
}

Wallet.defaultProps = {
  chainID: undefined
}

export default Wallet
