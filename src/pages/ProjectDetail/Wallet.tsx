import React, { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '@/components/Button'
import useAuth from '@/hooks/useAuth'
import { ConnectorTypeEnum } from '@/utils/web3-react'
import { color, computeSize, size } from '@/styles/variables'
import { CheckIcon, CopyIcon } from '@/components/Icon'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { wait } from '@/utils/misc'

const flex = css`
  display: inline-flex;
  width: fit-content;
  align-items: center;
`

const Account = styled.div`
  ${flex}
  gap: ${size.sm};
  font-size: ${size.tn};
`

const AccountContent = styled.span`
  ${flex}
  gap: ${computeSize(4)};
  font-size: ${size.tn};
  cursor: copy;
  user-select: none;
`

const svg = css`
  width: ${size.tn};
`

const AccountCopy = styled(CopyIcon)`
  ${svg}
`

const AccountCopied = styled(CheckIcon)`
  ${svg}
  fill: ${color.success};
`

interface IWalletProps {
  chainID?: number
}

const Wallet: FC<IWalletProps> = ({ chainID }) => {
  const { connectWallet, disconnectWallet, account, setChainID } = useAuth()
  const [isCopied, setIsCopied] = useState(false)

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

  const onCopy = async () => {
    copy(account)
    toast.success('Copied to clipboard!', {
      id: 'clipboard'
    })
    setIsCopied(true)
    await wait(1000)
    setIsCopied(false)
  }

  return (
    <Account>
      <AccountContent onClick={onCopy}>
        {accountEllipsis} {isCopied ? <AccountCopied /> : <AccountCopy />}
      </AccountContent>
      <Button onClick={disconnectWallet}>logout</Button>
    </Account>
  )
}

Wallet.defaultProps = {
  chainID: undefined
}

export default Wallet
