import { Proposal } from 'mysterium-vpn-js'
import _ from 'lodash'
import favoriteProposals from './favoriteProposals'

export interface ProposalsCountsInterface {
  proposalsCount?: number,
  proposalsFavoritesCount?: number,
  proposalsByCountryCounts?: Map<string, number>,
  proposalsByTypeCounts?: Map<string, number>
}

function increase(values: Map<string, number>, key: string): Map<string, number> {
  if (key) {
    const count = values.get(key) || 0
    values.set(key, count + 1)
  }

  return values
}

export function proposalsCounts(proposals: Proposal[]): ProposalsCountsInterface {
  proposals = Array.from(proposals || [])

  return {
    proposalsCount: proposals.length,
    proposalsFavoritesCount: proposals.filter(value => value && favoriteProposals.isFavorite(value)).length,
    proposalsByCountryCounts: proposals.reduce((values, proposal) => {
      return increase(values, _.get(proposal, 'serviceDefinition.locationOriginate.country'))
    }, new Map<string, number>()),
    proposalsByTypeCounts: proposals.reduce((values, proposal) => {
      return increase(values, proposal.serviceType)
    }, new Map<string, number>())
  }
}
