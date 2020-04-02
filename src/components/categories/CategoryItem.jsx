import React from 'react';
import PropTypes from 'prop-types';
import './CategoryItem.css';

class CategoryItem extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      className: "category-item"
    };

    console.log('constructor(): ' + props.index);
  }

  componentDidMount() {
    console.log('componentDidMount(): ' + this.props.index);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate()');

    this.updateClassNameWhenIndexChanged(prevState);
  }

  updateClassNameWhenIndexChanged(prevState) {
    const index = this.state.index;

    if (prevState.index !== index) {
      console.log(`Index changed from ${prevState.index} to ${index}`);
      let className = `category-item active-${index}`;
      this.setState({ className });
    }
  }

  render() {
    const category = this.props.category;

    const onClick = () => {
      if (this.props.isLastItem === true) {
        let index = this.state.index;
        index = ++index === 4 ? 0 : index;
        this.setState({ index })
      }
    };

    return (
      <div className={this.state.className} onClick={ onClick }>
         { category }
      </div>
    );
  }

}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  label: PropTypes.string,
  isLastItem: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};


export default CategoryItem;