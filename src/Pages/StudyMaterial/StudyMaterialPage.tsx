import AbstractPage, { AbstractPageState } from "../AbstractPages";
import { Button, Grid, Card, Typography } from "@mui/material";
import styles from "./StudyMaterial.module.css";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
import { StudyMaterial } from "../../../Backend/Classes/StudyMaterial";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
interface StudyMaterialsPageState extends AbstractPageState {
  studyMaterialList: StudyMaterial[];
  filteredStudyMaterialList: StudyMaterial[];
  filterTerm: string;
}

class StudyPage extends AbstractPage<object, StudyMaterialsPageState> {
  static contextType = PageTitleContext; // Correct contextType assignment

  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      studyMaterialList1: [],
      filterTerm: "",
      filteredStudyMaterialList: [],
    };
  }

  async componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Study Material");
    try {
      const studyMaterialAdapter = StudyMaterial.GetDatabaseAdapter();
      const data = await studyMaterialAdapter.LoadAll();
      if (data != null) {
        if (data instanceof Array) {
          const newStudyMaterial = data.map((studyMat) => StudyMaterial.fromFirebaseJson(studyMat));
          this.setState({ studyMaterialList: newStudyMaterial, filteredStudyMaterialList: newStudyMaterial });
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.split(",")[1];
        try {
          const userAuth = UserAuthentication.GetInstance();
          const userID: string | undefined = userAuth.GetCurrentUserId();
          console.log(userID);
          if (typeof userID === "string") {
            const studyMaterialAdapter = StudyMaterial.GetDatabaseAdapter();
            const newStudyMaterial = new StudyMaterial(userID, base64String, file.name);
            await studyMaterialAdapter.SaveObject(newStudyMaterial.GetJsonData());
            const data = await studyMaterialAdapter.LoadAll();
            if (data != null) {
              if (data instanceof Array) {
                const newStudyMaterial = data.map((studyMat) => StudyMaterial.fromFirebaseJson(studyMat));
                this.setState({ studyMaterialList: newStudyMaterial, filteredStudyMaterialList: newStudyMaterial });
              }
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  handleDownload = (index, fileName) => {
    const base64String = this.state.filteredStudyMaterialList[index];
    const linkSource = `data:application/octet-stream;base64,${base64String}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  filterContent = (filterTerm: string) => {
    let tempStudyMaterial = this.state.studyMaterialList;
    if (filterTerm != "") tempStudyMaterial = tempStudyMaterial.filter((studyMat) => studyMat.topic.toLowerCase().includes(filterTerm.toLowerCase()));
    this.setState({ filteredStudyMaterialList: tempStudyMaterial });
  };
  renderContent() {
    return (
      <div>
        <div className={styles.topContainer}>
          <input name="searchFilter" className={styles.searchBar} placeholder="Search here..." onChange={(e) => this.filterContent(e.target.value)} />
          <Button className={styles.addFileButton} onClick={() => document.getElementById("fileInput")?.click()}>
            Add File
          </Button>
          <input type="file" id="fileInput" className={styles.hiddenFileInput} onChange={this.handleFileChange} />
        </div>
        <Grid container spacing={4}>
          {this.state.filteredStudyMaterialList.map((studyMat: StudyMaterial, index: number) => (
            <Grid item xs={3} key={index}>
              <Card className={styles.studyItem}>
                <img src={`data:image/png;base64,${studyMat.fileMaterial}`} className={styles.fileImage} />
                <div className={styles.fileInfo}>
                  <Typography variant="h6" noWrap sx={{ textAlign: "left", marginLeft: "5%", marginTop: "5%" }}>
                    {studyMat.topic}
                  </Typography>
                  <Button
                    sx={{ width: "70%", display: "flex", alignSelf: "flex-end", fontSize: "90%" }}
                    onClick={() => {
                      this.handleDownload(index, studyMat.topic);
                    }}
                  >
                    Download
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default StudyPage;
