import React from 'react';
import styles from './Bounty.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as bountyActions } from 'public-modules/Bounty';
import { getCurrentUserSelector } from 'public-modules/Authentication/selectors';
import { map } from 'lodash';
import { DRAFT } from 'public-modules/Bounty/constants';
import {
  getDraftStateSelector,
  getDraftBountySelector,
  getBountySelector,
  getBountyStateSelector
} from 'public-modules/Bounty/selectors';
import { Pill, Text } from 'components';
import { PageCard, StagePill, LinkedAvatar } from 'explorer-components';

class BountyComponent extends React.Component {
  constructor(props) {
    super(props);

    const { match, loadBounty, loadDraftBounty } = props;

    if (match.path === '/bounty/draft/:id/') {
      loadDraftBounty(match.params.id);
    }

    if (match.path === '/bounty/:id/') {
      loadBounty(match.params.id);
    }
  }

  render() {
    const { user, loading, error, isDraft, bounty } = this.props;

    if (loading) {
      return <div>...loading</div>;
    }

    return (
      <PageCard>
        <PageCard.Header>
          <div className={styles.header}>
            <div className={styles.ethBox}>
              <Text color="white" typeScale="h3" className={styles.usd}>
                {`$${Number(bounty.usd_price).toFixed(2)}`}
              </Text>
              <Text
                color="white"
                typeScale="h5"
                className={styles.currency}
              >{`${Number(bounty.calculated_fulfillmentAmount)} ${
                bounty.tokenSymbol
              }`}</Text>
            </div>
            <div className={styles.bountyHeader}>
              <PageCard.Title>{bounty.title}</PageCard.Title>
              <div className={styles.categories}>
                {map(
                  category => <Pill className={styles.pill}>{category}</Pill>,
                  bounty.categories
                )}
              </div>
              <div className={styles.avatar}>
                <LinkedAvatar
                  img={bounty.user.profile_image}
                  address={bounty.user.public_address}
                  hash={bounty.user.public_address}
                  to={`profile/${bounty.user.public_address}`}
                  addressTextColor="white"
                  size="small"
                />
              </div>
            </div>
            <div className={styles.stage}>
              <StagePill stage={isDraft ? DRAFT : bounty.bountyStage} />
            </div>
          </div>
        </PageCard.Header>
        <PageCard.Content>Body Content</PageCard.Content>
      </PageCard>
    );
  }
}

const mapStateToProps = (state, router) => {
  const getDraftState = getDraftStateSelector(state);
  const getBountyState = getBountyStateSelector(state);
  const draftBounty = getDraftBountySelector(state);
  const currentBounty = getBountySelector(state);

  const { match } = router;
  let bounty = currentBounty;
  let bountyState = getBountyState;
  let isDraft = false;

  if (match.path === '/bounty/draft/:id/') {
    bounty = draftBounty;
    bountyState = getDraftState;
    isDraft = true;
  }

  return {
    user: getCurrentUserSelector(state),
    loading: bountyState.loading,
    error: bountyState.error,
    isDraft,
    bounty: bounty || {}
  };
};

const Bounty = compose(
  connect(
    mapStateToProps,
    {
      loadBounty: bountyActions.getBounty,
      loadDraftBounty: bountyActions.getDraft
    }
  )
)(BountyComponent);

export default Bounty;