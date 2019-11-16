import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import controller from '../Controller/noteController';
import { MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CardContent from '@material-ui/core/CardContent';
 import labelcontroller from '../Controller/labelController';
 import ColourChange from '../Components/ColourChange';
//  import Popper from '@material-ui/core/Poppe';
import Chip from '@material-ui/core/Chip';
import Label from './Label';
// import { withRouter } from 'react-router-dom'
import Reminder from './Reminder';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            padding: "12px 8px 7px"

        },
        MuiBackdrop: {
            backgroundcolor: "none"
        },

        MuiSvgIcon: {
            root: {
                fontSize: "1.2rem"
            }
        },
        root: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
        },
        chip: {
            // margin: createMuiTheme.spacing.unit
        },

        MuiPaper: {
            rounded: {
                borderRadius: "11px"
            }
        }


    }
})

export default class ReminderNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            close: false,
            colorChange: false,
            notesList: [],
            anchorEl: null,
            //anchorEll: null,
            deleteId: '',
            id: '',
            title: '',
            description: '',
            openDialog: false,
            labels: [],
            poperOpen: false,
            reminder:'',
        }
    }

    handleClose = () => {
        this.setState({ anchorEl: null });


    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleDialogueOpen = () => {
        this.setState({
            setOpen: true
        })
    }

    DialogHandleClose = event => {

        var noteDetails = {
            "id": this.state.id,
            "title": this.state.title,
            "description": this.state.description
        }
        this.setState({ openDialog: !this.state.openDialog });
        controller.updateNote(noteDetails).then((res) => {

            console.log(res.data)
            this.getNotes()

        }).catch((err) => {
            console.log("in error");
            console.log("error", err.data);
            this.setState({ message: 'failed to load the data' })
        });
        //console.log(noteDetails)

    };

    handleLabelDelete(labelId,noteId) {
       console.log("label remove",labelId,noteId)
       labelcontroller.removeLabel(labelId,noteId).then((res) => {
           console.log(res.obj)
           this.getNotes();
       }).catch((err) => {
        console.log("in error");
        console.log("error", err.data);
        this.setState({ message: 'failed to load the data' })
    });
       
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value

        })
        // console.log(this.state.title)
    }
    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
        // console.log(this.state.description)
    }

    handleNoteId = async (id) => {
        //console.log("Note id-->", id);
        await this.setState({
            deleteId: id
        })
    }

    handleDelete = async () => {
        controller.deleteNote(this.state.deleteId).then((res) => {

            console.log(res.data)
            this.getNotes()

        }).catch((err) => {
            console.log("in error");
            console.log("error", err.data);
            this.setState({ message: 'failed to load the data' })
        });
        await this.setState({
            anchorEl: null
        })
    };

    handleClickTakeNote = (note) => {
        console.log(note)
        this.setState({
            id: note.id,
            title: note.title,
            description: note.description,
            openDialog: !this.state.openDialog,
        })
    }



    componentDidMount() {
        this.getNotes();
    }


    getNotes = () => {
        controller.getNotes().then((res) => {
            this.setState({

                notesList: res.data.obj

            })
            console.log(this.state.notesList);


        }).catch((err) => {
            console.log("in error");
            console.log("error", err.response.data);
            this.setState({ message: 'failed to load the data' })
        })
    }
    archive = (id) => {
        console.log(" in archive", id)
        controller.archiveNote(id).then((res) => {

            console.log(res.data)
            this.getNotes()

        }).catch((err) => {
            console.log("in error");
            console.log("error", err.data);
            this.setState({ message: 'failed to load the data' })
        });

    }


    handleLabels=async(labelName,labelId)=>{
        console.log("label is ",labelName,labelId)
        await this.setState({
           
        })
        //this.props.history.push(`/labels/${labelName}`,this.state.appTitle)
        this.props.history.push('/notelabels/' + labelId)
    }
    
    render() {

        const { anchorEl } = this.state;
        const displaycard = this.props.viewprop ? "view-card" : "list-view"
        let getAllNotes = this.state.notesList.map((note) => {
            //console.log("noteid is----->", note.id);
            return (
                ( note === null || note.reminder === null)? '' :
                <div key={note.id} >
                    <MuiThemeProvider theme={theme} >

                        <Card className={displaycard}  style={{ backgroundColor: note.colour,
                           transform: (!this.props.menu) ? "translate(80px,0)" : null,
                           transition: (this.props.menu) ? ("0.3s") : ("0.3s") }} 
                         >
                            <div onClick={() => { this.handleClickTakeNote(note) }}>
                                <div className="notecardtittle">
                                    {note.title}
                                </div >
                                <div className="notecardDescription">
                                    {note.description}
                                </div>
                            </div>
                            <div className="labelsinnote">
                                {note.list.map((labels) => {
                                    return (
                                        <div key={labels.labelId}> {labels === '' ? null :
                                          <Chip label={labels.name} variant="outlined" onClick={()=>this.handleLabels(labels.name,labels.labelId)}
                                                onDelete={() => {this.handleLabelDelete(labels.labelId,note.id)}}

                                            />  
                                        }

                                        </div>
                                    )

                                })}
                            </div>

                            <div className="labelsinnote">
                                        {(note.reminder === undefined || note.reminder >= 0) ? null : <Chip 
                                            icon={<AccessTimeIcon />}
                                            label={new Date(note.reminder).toString().slice(0, 15)}
                                            // onDelete={() => this.handleDelete(!this.props.searchStateProps ? keys._id : keys.noteId)}
                                        />}
                                    </div>
                            <MuiThemeProvider theme={theme}>

                                <div className="buttons">
                                    <div>
                                        <Reminder noteId={note.id} />                                    </div>
                                    <div>
                                        <Tooltip title="collaborator">
                                            <IconButton aria-label="reminder">
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="collaborator">
                                            <IconButton aria-label="collaborator">
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        
                                      <ColourChange note={note} />
                                       
                                    </div>
                                    <div>
                                        <Tooltip title="Archive">
                                            <IconButton aria-label="colour" onClick={() => this.archive(note.id)}>
                                                <ArchiveOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="More"  >
                                            <IconButton
                                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}

                                            >
                                                <MoreVertIcon onClick={() => this.handleNoteId(note.id)} />
                                            </IconButton >
                                        </Tooltip>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={this.handleClose}
                                        >
                                            <MenuItem onClick={() => this.handleDelete()}>Delete</MenuItem>
                                            {/* <MenuItem onClick={(e)=>this.addLabel(e)}>Add Label</MenuItem> */}
                                            <Label noteId={this.state.deleteId} ></Label>
                                        </Menu>

                                    </div>
                                </div>

                            </MuiThemeProvider>

                        </Card>

                    </MuiThemeProvider>
                    <MuiThemeProvider theme={theme} >
                        <Dialog open={this.state.openDialog} >

                            < Card className="note-dialog" >

                                <CardContent>
                                    <TextField
                                        type="text"
                                        multiline
                                        fullWidth
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                    />
                                </CardContent>
                                <CardContent>
                                    <TextField
                                        type="text"
                                        multiline
                                        fullWidth
                                        value={this.state.description}
                                        onChange={this.handleDescription}
                                    />
                                </CardContent>


                                <div className="buttons">
                                    <div>
                                        <Tooltip title="reminder">
                                            <IconButton aria-label="reminder" className="iconButtons">
                                                <AddAlertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="collaborator">
                                            <IconButton aria-label="reminder">
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="collaborator">
                                            <IconButton aria-label="collaborator">
                                                <PersonAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="colour">
                                            <IconButton aria-label="colour">
                                                <PaletteOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Archive">
                                            <IconButton aria-label="colour">
                                                <ArchiveOutlinedIcon onClick={() => this.archive(note.id)} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Button component="span" onClick={() => this.DialogHandleClose()} >
                                            Close
                                        </Button>
                                    </div>
                                </div>

                            </ Card>

                        </Dialog>
                    </MuiThemeProvider>
                    {/* <Popper open={this.state.anchorEll} anchorEll={this.state.anchorEll}>

                        <Paper>
                            <h3>this is paper</h3>
                        </Paper>
                    </Popper> */}

                </div>
            )
        })
        return (
            <div className="get-cards">
                {getAllNotes}
            </div>
        )
    }
}
