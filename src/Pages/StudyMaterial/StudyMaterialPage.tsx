import AbstractPage, { AbstractPageState } from "../AbstractPages";
import {
    Button,
    Card,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "./StudyMaterial.module.css";
import {
    PageTitleContext,
    PageTitleContextType,
} from "../../Layouts/MainLayout";

class StudyMaterial {
    public title: string;
    public link: string;

    constructor(_title: string, _link: string) {
        this.title = _title;
        this.link = _link;
    }
}

interface StudyMaterialsPageState extends AbstractPageState {
    studyMaterialList1: StudyMaterial[];
}

class StudyPage extends AbstractPage<object, StudyMaterialsPageState> {
    static contextType = PageTitleContext; // Correct contextType assignment

    constructor(props: {}) {
        super(props);
        this.state = {
            data: null,
            error: null,
            studyMaterialList1: [
                    new StudyMaterial("fastRollNo.png", "4"),
                    new StudyMaterial("2", "4"),
                    new StudyMaterial("3", "4"),
                    new StudyMaterial("4", "4"),
                    new StudyMaterial("5", "4"),
                    new StudyMaterial("6", "4"),
                    new StudyMaterial("7", "4"),
                    new StudyMaterial("8", "4"),
                    new StudyMaterial("9", "4"),
                    new StudyMaterial("10", "4")
            ],
        };
    }

    componentDidMount() {
        const { setPageTitle } = this.context as PageTitleContextType;
        setPageTitle("Study Material");
    }

    renderContent() {
        return (
            <div>
                <div className={styles.topContainer}>
                    <Button className={styles.addButton}>
                        <img src="src/Pages/StudyMaterial/addItemSign.png" alt=" " />
                        Add File
                    </Button>
                    <input name="searchFilter" className={styles.searchBar}
                    placeholder="Search here..."/>
                </div>
                <Grid container spacing={4}>
                    {this.state.studyMaterialList1.map((studyMat: StudyMaterial, index: number) => (
                        <Grid item xs={3} key={index}>
                            <Card className={styles.studyItem}>
                                <div className={styles.iconImg}>
                                    Icon
                                </div>
                                <div className={styles.fileInfo}>
                                    <Typography variant="h6" noWrap  sx={{textAlign: 'left', marginLeft: "5%", marginTop: "5%"}}>
                                    {studyMat.title}

                                    </Typography>
                                    <Button sx={{width:"70%", display:"flex", alignSelf:"flex-end", fontSize:"90%"}}>
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
