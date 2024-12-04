import { Component } from "react";
import { Profile } from "../../Backend/Classes/Profile";
import { Button } from "@mui/material";
import { UserAuthentication } from "../../Backend/UserAuth/UserAuthentication";
import { withMenuNavigation } from "../router";
import { SetUserId } from "../Pages/ViewProfilePage/ViewProfilePage";

interface UserSearchedProps {
  handleMenuSelect: (route: string) => void;
}

interface UserSearchedComponent {
  userId: string;
  avatar: string;
  name: string;
}

interface UserSearchedState {
  UserSearched: UserSearchedComponent[];
  isOpen: boolean;
  dropdownPosition: { top: number; left: number; width: number };
}

class UserSearchComponent extends Component<
  UserSearchedProps,
  UserSearchedState
> {
  profileAdapter = Profile.GetDatabaseAdapter();

  constructor(props: UserSearchedProps) {
    super(props);
    this.state = {
      isOpen: false,
      UserSearched: [],
      dropdownPosition: { top: 0, left: 0, width: 0 },
    };
  }

  async DisplayUsers(id: string) {
    let input = document.getElementById(id) as HTMLInputElement;
    let name = input.value;

    if (!name) {
      this.setState({ UserSearched: [], isOpen: false });
      return;
    }

    const data = await this.profileAdapter.LoadByName("userName", name);

    if (Array.isArray(data)) {
      const users = data
        .map((user) => {
          const userData = user as {
            userId: string;
            userName: string;
            profilePic: string;
          };
          if (
            userData.userId !==
            UserAuthentication.GetInstance().GetCurrentUserId()
          ) {
            return {
              userId: userData.userId,
              avatar: userData.profilePic || "https://via.placeholder.com/50", // Default avatar if empty
              name: userData.userName,
            };
          }
          return undefined;
        })
        .filter((user): user is UserSearchedComponent => user !== undefined);

      console.log(users);

      // Get position of the input field
      const inputRect = input.getBoundingClientRect();
      const dropdownPosition = {
        top: inputRect.bottom + window.scrollY, // Position dropdown below input
        left: inputRect.left + window.scrollX,
        width: inputRect.width, // Match dropdown width to input field width
      };

      // Update the state with the searched users and dropdown position
      this.setState({
        UserSearched: users,
        isOpen: users.length > 0,
        dropdownPosition,
      });
    } else {
      console.log("Unexpected data format or no users found.");
      this.setState({ UserSearched: [], isOpen: false });
    }
  }

  render() {
    const { UserSearched, isOpen, dropdownPosition } = this.state;
    const { handleMenuSelect } = this.props;
    // const { setUserId } = this.context as ViewProfileIDtype;
    return (
      <>
        <input
          type="text"
          placeholder="Search Users"
          id="searchUsersInputField"
        />
        <button
          id="searchUsersButton"
          onClick={() => this.DisplayUsers("searchUsersInputField")}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "8px 16px",
            marginLeft: "15px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        {/* Display search results as a dropdown */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: dropdownPosition.top, // Set dynamic top position
              left: dropdownPosition.left, // Set dynamic left position
              width: dropdownPosition.width, // Set width to match input
              border: "1px solid #ccc",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
          >
            {UserSearched.length > 0 ? (
              UserSearched.map((user, index) => (
                <Button
                  onClick={() => {
                    SetUserId(user.userId);
                    handleMenuSelect("ViewProfile");
                    this.setState({ isOpen: false });
                    // setUserId(user.userId);
                  }}
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",

                    justifyContent: "flex-start",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s Avatar`}
                    style={{
                      width: "10%",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <span>{user.name}</span>
                </Button>
              ))
            ) : (
              <div style={{ padding: "8px" }}>No results found</div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default withMenuNavigation(UserSearchComponent);
