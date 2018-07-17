import React from 'react';
import PropTypes from 'prop-types';
import styles from './BountyCard.module.scss';
import { map, includes } from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Card, Text, Pill, Avatar } from 'components';

const BountyCard = props => {
  const {
    title,
    categories,
    img,
    address,
    experienceLevel,
    submissions,
    deadline,
    value,
    usd,
    currency,
    onPillClick,
    selectedCategories
  } = props;

  const renderCategories = () => {
    return map(category => {
      let backgroundColor = 'white';
      let hoverBackgroundColor = 'nearWhite';
      if (includes(category.normalized_name, selectedCategories)) {
        backgroundColor = 'nearWhite';
        hoverBackgroundColor = 'white';
      }

      return (
        <div className={styles.pill}>
          <Pill
            key={category.normalized_name}
            onClick={() => onPillClick(category.normalized_name)}
            backgroundColor={backgroundColor}
            hoverBackgroundColor={hoverBackgroundColor}
          >
            {category.name}
          </Pill>
        </div>
      );
    }, categories);
  };

  return (
    <Card hover className={styles.bountyCard}>
      <Card.Body>
        <div className="row">
          <div className="col-xs-7">
            <Text
              typeScale="h4"
              weight="fontWeight-medium"
              className={styles.titleText}
            >
              {title}
            </Text>
            <div className={styles.categoryList}>{renderCategories()}</div>
            <div className={styles.avatar}>
              <Avatar img={img} address={address} hash={address} size="small" />
            </div>
          </div>
          <div className="col-xs-3">
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey">
                  <FontAwesomeIcon icon={['far', 'seedling']} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {experienceLevel || 'Unknown'}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                difficulty
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={['far', 'clock']} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {deadline}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                remaining
              </Text>
            </div>
            <div className={styles.detailGroup}>
              <div className={styles.detailIcon}>
                <Text inline color="defaultGrey" className={styles.detailIcon}>
                  <FontAwesomeIcon icon={['far', 'level-up']} />
                </Text>
              </div>
              <Text
                inline
                className={styles.detailInput}
                weight="fontWeight-medium"
              >
                {submissions || 0}
              </Text>
              <Text inline color="defaultGrey" className={styles.detailLabel}>
                submissions
              </Text>
            </div>
          </div>
          <div className="col-xs-2">
            <div className={styles.price}>
              <Text color="purple" typeScale="h3" className={styles.usd}>
                ${usd}
              </Text>
              <Text
                color="defaultGrey"
                typeScale="h5"
                className={styles.currency}
              >{`${value} ${currency}`}</Text>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

BountyCard.propTypes = {
  experienceLevel: PropTypes.string,
  title: PropTypes.string,
  categories: PropTypes.array,
  img: PropTypes.string,
  address: PropTypes.string,
  submissions: PropTypes.number,
  deadline: PropTypes.string,
  value: PropTypes.number,
  usd: PropTypes.number,
  currency: PropTypes.string,
  onPillClick: PropTypes.func
};

BountyCard.defaultProps = {
  onPillClick: () => {},
  experienceLevel: 'Unknown'
};

export default BountyCard;