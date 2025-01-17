import React, { useContext } from "react";
import { connect } from "react-redux";
import { Button, List, Progress } from "semantic-ui-react";
import PropTypes from "prop-types";
import { branch, compose, lifecycle, renderComponent } from "recompose";
import { bindActionCreators } from "redux";

import { run, stop } from "ducks/saga";
import { removeTask } from "ducks/task";
import TranslationContext from "Layout/TranslationContext";

import imageEmpty from "../../images/no_data.svg";

import saga from "./saga";

const Empty = () => {
  const getTranslation = useContext(TranslationContext);

  return (
    <div className="lingvo-sidebar__empty">
      <h3>{getTranslation("No background tasks")}</h3>
      <img src={imageEmpty} className="lingvo-sidebar__empty-img" />
    </div>
  );
};

const enhance = branch(({ tasks }) => tasks.length === 0, renderComponent(Empty));

function Task(props) {
  const {
    id,
    progress,
    status,
    task_details,
    task_family,
    current_stage,
    total_stages,
    result_link_list,
    removeTask: remove
  } = props;

  const links = result_link_list.map(link => (
    <div key={link} className="lingvo-task__link">
      <a href={link} key={link}>
        {link}
      </a>
    </div>
  ));

  return (
    <List.Content>
      <div className="lingvo-task">
        <div className="lingvo-task__title">{task_family}</div>
        <Button className="lingvo-task__delete" onClick={() => remove(id)}>
          <i className="lingvo-icon-close" />
        </Button>
        <div className="lingvo-task__content">
          <div className="lingvo-task__details">{task_details}</div>
          <Progress
            percent={progress}
            progress="percent"
            size="small"
            className={
              progress && progress === 100
                ? "lingvo-task__progress lingvo-task__progress_success"
                : "lingvo-task__progress"
            }
          />
          <div
            className={
              progress && progress === 100 ? "lingvo-task__label lingvo-task__label_success" : "lingvo-task__label"
            }
          >
            {`(${current_stage}/${total_stages}) ${status}`}
          </div>
          {links}
        </div>
      </div>

      <List.Description />
    </List.Content>
  );
}

const Task1 = connect(null, dispatch => bindActionCreators({ removeTask }, dispatch))(Task);

const TaskList = enhance(({ tasks }) => (
  <List relaxed>
    {tasks.map(task => (
      <List.Item key={task.id}>
        <Task1 {...task} />
      </List.Item>
    ))}
  </List>
));

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

function generateId() {
  return Math.random().toString(36).substr(2, 12);
}

const mapActionsToProps = () => dispatch => {
  const sagaId = generateId();
  return {
    onMount() {
      dispatch(run({ saga, sagaId }));
    },
    onUnmount() {
      dispatch(stop(sagaId));
    }
  };
};

export default compose(
  connect(null, mapActionsToProps),
  lifecycle({
    componentDidMount() {
      this.props.onMount();
    },

    componentWillUnmount() {
      this.props.onUnmount();
    }
  })
)(TaskList);
