import { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./JobPage.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { Jobs } from "../../../Backend/Classes/Jobs";
import { Profile } from "../../../Backend/Classes/Profile";

interface Job {
  id: string;
  title: string;
  location: string;
  category: string;
  description:string,
  employer:string,
  salary:number,
}


interface JobPageState extends AbstractPageState {
  selectedCategory: string;
  selectedLocation: string;
  openDialog: boolean; // Track dialog visibility
  selectedJob: Job | null; // Track selected event details
  open:boolean,
  jobsData: Job[],
  isAlumni:boolean,
}

class JobPage extends AbstractPage<{}, JobPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      error: null,
      selectedCategory: "All Positions",
      selectedLocation: "All locations",
      openDialog: false,
      selectedJob: null,
      jobsData:[],
      open: false,
      isAlumni:false,
    };
  }
  static contextType = PageTitleContext; // Correct contextType assignment

  ShowDisplay() {
    const { open } = this.state;
    return (
      <Dialog open={open}>
        <DialogTitle>Create new Group</DialogTitle>
        <DialogContent>
          <input type="text" placeholder="Job Title" id="jobNameField" />
          <br />
          <input type="text" placeholder="Job Description" id="jobDescField" />
          <br />
          <input type="text" placeholder="Job Location" id="jobLoactionField" />
          <br />
          <input type="text" placeholder="Job Category" id="jobCategoryField" />
          <br />
          <input type="text" placeholder="Job Salary" id="jobSalField" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ open: false })} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={ async () => {
              this.setState({open:false
              });

              let titleElement = document.getElementById("jobNameField") as HTMLInputElement;
              let descElement = document.getElementById("jobDescField") as HTMLInputElement;
              let locationElement = document.getElementById("jobLoactionField") as HTMLInputElement;
              let categoryElement = document.getElementById("jobCategoryField") as HTMLInputElement;
              let salElement = document.getElementById("jobSalField") as HTMLInputElement;

              let title = titleElement.value;
              let desc = descElement.value;
              let category = categoryElement.value;
              let location = locationElement.value;
              let sal = salElement.value;
              let salary = parseInt(sal);
              
              let userId = UserAuthentication.GetInstance().GetCurrentUserId();
              let job = new Jobs(title,salary,userId,category,desc,location);

              let jobAdapter = Jobs.GetDatabaseAdapter();
              let id = await jobAdapter.SaveObject(job.GetJsonData());
              
              let profile = await UserAuthentication.GetInstance().GetCurrentUserProfile();
              if(profile === null)
                return;
              let name = profile.userName;
              let newjobsData=this.state.jobsData;
              newjobsData.push({
                id: id,
                title:job.title,
                description:job.description,
                category:job.category,
                location: job.location,
                salary:job.salary,
                employer:name,
              });
              this.setState({
                jobsData:newjobsData
              })
              
            }}
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  async componentDidMount() {
    // Correctly access context here
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Job Page");

    let type = await UserAuthentication.GetInstance().GetCurrentUserType();
    if(type !== null && type === "alumni")
      this.setState({isAlumni:true});

    await this.LoadJobs();
  }

  handleCategoryChange = (_: React.ChangeEvent<{}>, value: string) => {
    this.setState({ selectedCategory: value });
  };

  async LoadJobs(){
    try{
    let jobAdapter = Jobs.GetDatabaseAdapter();
    let dbJobs = await jobAdapter.LoadAll();
    if(!dbJobs)
      return;

    
    let newJobsData:Job[]= [];
     dbJobs.forEach(async (dbJob:any) => {
      let profileAdapter = Profile.GetDatabaseAdapter();
      const profile = await profileAdapter.LoadById(dbJob.ownerUserId);
      const user:Profile = Profile.fromFirebaseJson(profile);
      
      let userName = user.userName;
      if(user){
        newJobsData.push({
          id:dbJob.id,
          title:dbJob.title,
          description:dbJob.description,
          salary:dbJob.salary,
          category:dbJob.category,
          employer:userName,
          location:dbJob.location
        });
        this.setState({
          jobsData:newJobsData
        })
      }
    });
    
  }
  catch(e){
    if(e instanceof Error){
      console.log(e.message);
    }
    else{
      throw new Error("Unknown");
    }
  }
  }

  ShowButtonIfAlumni(){
    if(this.state.isAlumni)
    return (
          <Button
            onClick={() => {
              this.setState({open:true});
            }}
            color="secondary"
          >Add Job</Button>
    );
  }

  handleLocationChange = (event: SelectChangeEvent<string>) => {
    this.setState({ selectedLocation: event.target.value as string });
  };
  handleDialogOpen = (event: Job) => {
    this.setState({ openDialog: true, selectedJob: event });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedJob: null });
  };
  renderDialog() {
    const { openDialog, selectedJob } = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={this.handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedJob?.title || "Event Details"}</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Box>
              <Typography>
                <strong>Location:</strong> {selectedJob.location}
              </Typography>
              <Typography>
                <strong>Category:</strong> {selectedJob.category}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedJob.description}
              </Typography>
              <Typography>
                <strong>Salary:</strong> {selectedJob.salary}
              </Typography>
              <Typography>
                <strong>Employer:</strong> {selectedJob.employer}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderContent() {
    const { selectedCategory, selectedLocation, jobsData } = this.state as {
      selectedCategory: string;
      selectedLocation: string;
      jobsData: Job[];
    };

    const categories = [
      "All Positions",
      "Data Science",
      "Engineering",
      "Marketing",
    ];

    const filteredJobs = jobsData.filter(
      (job) =>
        (selectedCategory === "All Positions" ||
          job.category === selectedCategory) &&
        (selectedLocation === "All locations" ||
          job.location === selectedLocation)
    );

    return (
      <>
        {" "}
        <Box className={styles.pageContainer}>
          {/* Header */}
          <Typography variant="h4" className={styles.header}>
            Open positions in{" "}
            <Select
              value={selectedLocation}
              onChange={this.handleLocationChange}
              className={styles.locationSelect}
              sx = {{color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
            >
              <MenuItem value="All locations">All locations</MenuItem>
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="Kiev">Kiev</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Washington">Washington</MenuItem>
            </Select>
            {this.ShowButtonIfAlumni()}
          </Typography>
          {/* Filter Tabs */}
          <Tabs
            value={selectedCategory}
            onChange={this.handleCategoryChange}
            centered
            className={styles.filterTabs}
          >
            {categories.map((category) => (
              <Tab key={category} value={category} label={category} sx = {{color : "white"}} />
            ))}
          </Tabs>

          {/* Job Grid */}
          <Grid container spacing={4} className={styles.jobGrid}>
            {filteredJobs.map((job) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job.id}>
                <Card className={styles.jobCard}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 16px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      className={styles.infoButton}
                      sx={{ flex: 1 }}
                      onClick={() => this.handleDialogOpen(job)}
                    >
                      Info
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {this.renderDialog()}
        {this.ShowDisplay()}
      </>
    );
  }
}

export default JobPage;
