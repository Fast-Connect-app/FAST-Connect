import AbstractPage from "../AbstractPages";
import {
    PageTitleContext,
    PageTitleContextType,
  } from "../../Layouts/MainLayout";

class StudyPage extends AbstractPage {
    // changes page title to "Study Material"
    static contextType = PageTitleContext; // Correct contextType assignment
    componentDidMount() {
        const { setPageTitle } = this.context as PageTitleContextType;
        setPageTitle("Study Material");
    }
    renderContent() {
        return (
            // fragment to allow multiple divs
            <>
                <div>
                    hi
                </div>
            </>
            
        )
    }
}

export default StudyPage;