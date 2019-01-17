const React = require('react');

const Tag = require('./Tag');
const TagForm = require('./TagForm');

class TagList extends React.Component {
  render() {
    const tagElements = this.props.tags.map(tag => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          expanded={true}
          filtered={this.props.filterTag === tag.id}
          handleDeleteButton={() => this.props.tagHandlers.handleDeleteButton(tag)}
          handleFilterButton={() => this.props.tagHandlers.handleFilterButton(tag)}
        />
      );
    });

    return (
      <div className="taglist">
        <TagForm
          tagHandlers={this.props.tagHandlers}
        />

        <div className="field is-grouped is-grouped-multiline">
          {tagElements}
        </div>
      </div>
    );
  }
}

module.exports = TagList;
