const React = require('react');

class Tag extends React.Component {
  render() {
    return (
      <div className="control">
        <div className="tags has-addons">
          <a className="tag is-link">{this.props.tag.title}</a>
          <a className="tag is-delete"></a>
        </div>
      </div>
    );
  }
}

module.exports = Tag;
