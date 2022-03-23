import { BigNumber, utils } from 'ethers'

const { solidityKeccak256, defaultAbiCoder, keccak256 } = utils

interface INode {
  hash: string
  parent?: INode
  left?: INode
  right?: INode
}

/**
 * @description Modifies the array in place to ensure even numbers by duplicating last element if necessary
 * @param {array} elements An array
 * @returns {array} A new array
 */
export function makeEvenElements(elements: string[]): string[] {
  if (elements.length === 0) {
    throw new Error('No data was provided...')
  }

  const even = elements

  if (even.length % 2 !== 0) {
    even.push(even[even.length - 1])
  }

  return even
}

/**
 * @description Sorts an array (ascending order)
 * @param {array} arrayToSort The array to sort
 * @returns {array} The sorted array
 */
export function sort(arrayToSort: INode[]) {
  const sortedArray = [...arrayToSort]
  return sortedArray.sort((a, b) =>
    BigNumber.from(a.hash).gt(b.hash) ? 1 : -1
  )
}

/**
 * @description Builds the leaves of a Merkle tree
 * @param {array} data An array of data
 * @returns {array} The leaves of the Merkle tree (as an even and sorted array)
 */
export function buildLeaves(data: string[]): INode[] {
  const leaves = makeEvenElements(data).map(leaf => ({
    hash: leaf
  }))
  return sort(leaves)
}

/**
 * @description Calculates a new node from 2 values
 * @param {string} left The left parameter for the new node
 * @param {string} right The right parameter for the new node
 * @returns {string} The new node (hash)
 */
export function calculateParentNode(left?: INode, right?: INode): INode {
  let hash
  // If a node doesn't have a sibling, it will be hashed with itself
  if (right && left === undefined) {
    hash = solidityKeccak256(['bytes32', 'bytes32'], [right.hash, right.hash])
  } else if (left && right === undefined) {
    hash = solidityKeccak256(['bytes32', 'bytes32'], [left.hash, left.hash])
  } else if (left && right) {
    hash = solidityKeccak256(['bytes32', 'bytes32'], [left.hash, right.hash])
  } else {
    throw new Error(`invalid node pair, both are undefined`)
  }

  let leftCopy: INode | undefined
  let rightCopy: INode | undefined
  const parent: INode = {
    hash
  }

  if (left) {
    leftCopy = { ...left }
    leftCopy.parent = parent
  }
  if (right) {
    rightCopy = { ...right }
    rightCopy.parent = parent
  }

  parent.left = leftCopy
  parent.right = rightCopy

  return parent
}

/**
 * @description Calculates the parent nodes from an array of nodes
 * @param {array} nodes The current nodes
 * @returns {array} The parent nodes
 */
export function createParentNodes(nodes: INode[]): INode[] {
  const parentsNodes = []

  for (let i = 0; i < nodes.length; i += 2) {
    if (!nodes[i] && !nodes[i + 1]) {
      throw new Error('both undefined')
    }
    const node = calculateParentNode(nodes[i], nodes[i + 1])
    parentsNodes.push(node)
  }

  return parentsNodes
}

/**
 * @description Computes a merkle tree
 * @param {array} leaves The initial leaves of the tree
 * @returns {object} A merkle tree
 */
export function computeMerkleTree(leaves: INode[]): INode {
  let nodes = leaves

  while (nodes.length > 1) {
    nodes = createParentNodes(nodes)
    nodes = sort(nodes)
  }

  return nodes[0]
}

export function calculateClaimHash(claim: IClaim): string {
  const types = []
  const values: IClaim[] = []
  types.push(
    'tuple(address to, tuple(uint256[] ids, uint256[] values, address contractAddress)[] erc1155, tuple(uint256[] ids, address contractAddress)[] erc721, tuple(uint256[] amounts, address[] contractAddresses) erc20, bytes32 salt)'
  )
  values.push(claim)
  return keccak256(defaultAbiCoder.encode(types, values))
}

export function createDataArrayClaim(claims: IClaim[]): string[] {
  return claims.map((claim: IClaim) => calculateClaimHash(claim))
}

export function getRoot(data: string[]) {
  const leavesByHash: { [hash: string]: INode } = {}
  const leaves = buildLeaves(data)
  leaves.forEach(leaf => {
    leavesByHash[leaf.hash] = leaf
  })

  return computeMerkleTree(leaves)
}
