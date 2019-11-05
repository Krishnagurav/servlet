import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme, MenuItem, Divider } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import controller from '../Controller/labelController';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import { InputBase,TextField } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';




const themes = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                width: 250,
                top: 65,
                height: "90%",
                background: 'white',
                overflowY: 'hidden'
            },
            MuiSvgIcon: {
                root: {
                    fontSize: "1.2rem"
                }
            },
            paperAnchorDockedLeft: {
                borderColor: "white",
                borderRight: "1px solid rgba(0, 0, 0, 0)"
            }
        }


    }
})

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            close: false,
            colorChange: false,
            openDialog: false,
            labelsList: [],
            labels: [],
        }
    }

    dialogOpen = (listOflabels) => {
       
        this.setState({
            labels:listOflabels,
            openDialog: !this.state.openDialog,
        })
    }
    renderNote = () => {

        this.props.history.push("/note")

    }
    renderTrashedNote = () => {

        this.props.history.push("/trashed")

    }

    renderArchiveNote = () => {

        this.props.history.push("/archive")

    }

    componentDidMount() {
        this.getLabels();

    }

    getLabels = () => {
        controller.getAllLabel().then((res) => {
            this.setState({

                labelsList: res.data.obj

            })
            console.log(this.state.labelsList);


        }).catch((err) => {
            console.log("in error");
            console.log("error", err.response.data);
            this.setState({ message: 'failed to load the data' })
        })
    }

    render() {

        let getAllLabel = this.state.labelsList.map((key) => {
            return (
                <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }} key={key.labelId}  >
                    <LabelOutlinedIcon style={{ paddingRight: "48px" }} />{key.name}</MenuItem>
            )
        })

        let getAllLabels = this.state.labels.map((key) => {
            return(
            <div className="labelCard" key={key.labelId}>
              
                <div className="tekeLabelCard" key={key.labelId}>

                    <div role="button">
                        <MuiThemeProvider theme={themes}>
                            <DeleteIcon />
                        </MuiThemeProvider>
                    </div>


                    <div className="labelInput">
                    <TextField
                            type="text"
                            className="inputField"
                            placeholder="Take Label"
                            value={key.name}
                        />
                    </div>

                    <div role="button">
                        <DoneIcon />
                    </div>
                </div>
            </div>

        )})

        return (
            <div className="drawer">
                <MuiThemeProvider theme={themes}>
                    <Drawer variant='persistent' overflow='auto' open={this.props.menu} >
                        <div className="firstBtn" >
                            <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }} onClick={this.renderNote}>
                                <EmojiObjectsOutlinedIcon />
                                <span className="sideNav" >Notes</span>
                            </MenuItem>
                            <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }}>
                                <AddAlertOutlinedIcon />
                                <span className="sideNav" >Reminders</span>
                            </MenuItem>
                        </div>
                        <Divider />
                        <div className="labelTag">LABELS</div>
                        <div>{getAllLabel}</div>
                        <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }} onClick={() => { this.dialogOpen(this.state.labelsList) }}>
                            <CreateOutlinedIcon />
                            <span className="sideNav" >Edit Labels</span>
                        </MenuItem>
                        <Dialog open={this.state.openDialog} >
                            <Card className="label-dialog">
                                <div className="labelCard">
                                    <div className="labelText">Edit Labels</div>
                                    <div className="tekeLabelCard">

                                        <div role="button">
                                            <MuiThemeProvider theme={themes}>
                                                <CloseIcon />
                                            </MuiThemeProvider>
                                        </div>


                                        <div className="labelInput">
                                            <InputBase
                                            type="text"
                                                className="inputField"
                                                placeholder="Take Label"
                                            />
                                        </div>

                                        <div role="button">
                                            <DoneIcon />
                                        </div>
                                    </div>
                                </div>
                                {getAllLabels}
                            </Card>
                        </Dialog>
                        <div className="firstBtn">
                            <Divider />
                        </div>
                        <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }} onClick={this.renderArchiveNote}>
                            <ArchiveOutlinedIcon />
                            <span className="sideNav" >Archive</span>
                        </MenuItem>
                        <MenuItem className="btn" style={{ borderBottomRightRadius: "50px 50px", borderTopRightRadius: "50px 50px" }} onClick={this.renderTrashedNote}>
                            <DeleteOutlineOutlinedIcon />
                            <span className="sideNav" >Trash</span>
                        </MenuItem>
                    </Drawer>
                </MuiThemeProvider>

            </div>
        )
    }
}

export default withRouter(SideNav);




 // MuiDrawer: {
        //     paper: {
        //         top: "65px",
        //         display: "table"
        //     },
        //     paperAnchorLeft: {
        //         width: "250px",
        //     },
        //     paperAnchorDockedLeft: {
        //             borderColor: "white"

        //     }
        // }