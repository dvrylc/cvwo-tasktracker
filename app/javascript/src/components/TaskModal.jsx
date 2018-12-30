const React = require('react');
const Modal = require('react-modal');

Modal.setAppElement('#root');

class TaskModal extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.taskID) {
      const task = this.props.tasks.filter(t => t.id === this.props.taskID)[0];
      if (!task.tag_id) {
        task.tag_id = '';
      }

      this.state = {
        task: task
      }
    } else {
      this.state = {
        task: {
          id: null,
          title: '',
          done: false,
          tag_id: ''
        }
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;

    let value;
    if (e.target.type === 'text') {
      value = e.target.value;
    } else {
      value = e.target.value === '' ? '' : parseInt(e.target.value);
    }

    const newTask = this.state.task;
    newTask[name] = value;

    this.setState({
      task: newTask
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.task.id) {
      this.props.taskHandlers.handleSubmit(this.state.task);
    } else {
      this.props.taskHandlers.handleCreate(this.state.task);
    }

    this.props.resetModals();
  }

  render() {
    const tagOptions = this.props.tags.map(t => {
      return <option key={t.id} value={t.id}>{t.title}</option>;
    });

    return (
      <Modal
        isOpen={this.props.isOpen}
        className="taskmodal"
      >

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                name="title"
                type="text"
                className="input"
                value={this.state.task.title}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  name="tag_id"
                  value={this.state.task.tag_id}
                  onChange={this.handleChange}
                >
                  <option value=''>No tag</option>
                  {tagOptions}
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <a
                className="button is-small is-outlined"
                onClick={this.props.resetModals}
              >
                Cancel
              </a>
            </p>

            <p className="control">
              <input
                type="submit"
                className="button is-small is-outlined is-link"
                value="Save"
              />
            </p>
          </div>
        </form>
      </Modal >
    );
  }
}

module.exports = TaskModal;