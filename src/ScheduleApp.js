import React, { Component } from "react";
import Goals from "./components/goals";
import AddForm from "./components/addForm";
import DelForm from "./components/delForm";
import NavBar from "./components/navbar";

class ScheduleApp extends Component {
  state = {
    isOpen: false,
    isDelOpen: false,
    currID: 0,
    goals: [],
    toDel: null
  };

  handleDelete = id => {
    this.setState({toDel:id},() => {
        this.setState({isDelOpen: true});
    });

  };
  handleDelClose = data => {
      const toDel = this.state.toDel;
      if(data){
          const goals = this.state.goals.filter(x => x.id !== this.state.toDel);
          this.setState({ goals });
      }
      this.setState({toDel: null});
      this.setState({isDelOpen:false});
  };
 
  handleAdd = () => {
    this.setState({ isOpen: true });
  };

  handleClose = data => {
    this.setState({ isOpen: false });
    if (!data) {
      return null;
    }

    const { goalTitle, goalBody } = data;

    const goals = this.state.goals;
    goals.push({ id: this.state.currID, goalTitle, goalBody });
    this.setState({ goals });
    this.setState({ currID: this.state.currID + 1 });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="App row justify-content-around">
            <div className="col-5 goalCol">
              <Goals
                className="leftGoals"
                goals={this.state.goals}
                currID={this.state.currID}
                onDelete={id => this.handleDelete(id)}
              />
              <button
                className="btn btn-primary btn-sm m-2"
                onClick={this.handleAdd}
              >
                Add Goal
              </button>
            </div>

            <div className="col-5 compCol">
              <p>completed goals placeholder</p>
            </div>
          </div>
        </div>

        <AddForm
          open={this.state.isOpen}
          onFormClose={data => this.handleClose(data)}
        />
        <DelForm open={this.state.isDelOpen} onFormClose={data => this.handleDelClose(data)}/>
      </React.Fragment>
    );
  }
}

export default ScheduleApp;