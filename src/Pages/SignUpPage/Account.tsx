
import Login from "./Login";
import Register from "./Signup";
import styles from "./Account.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";

interface AccountState extends AbstractPageState {
  isLoginActive: boolean;
}

class Account extends AbstractPage<object, AccountState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: null,
      error: null,
      isLoginActive: true, // Initialize the state
    };
  }

  toggleActiveComponent = () => {
    this.setState((prevState) => ({
      isLoginActive: !prevState.isLoginActive, // Toggle the state
    }));
  };

  renderContent() {
    const { isLoginActive } = this.state;

    return (
      <div className={styles.container}>
        {/* Left Section */}
        <div
          className={`${styles.left} ${
            isLoginActive ? styles.active : styles.inactive
          }`}
          style={{
            transform: isLoginActive ? "translateX(0)" : "translateX(100%)",
            opacity: isLoginActive ? 1 : 0,
            pointerEvents: isLoginActive? "auto":"none"
          }}
        >
          <Login />
          <div
            className={styles.box}
            style={{
              transform: isLoginActive ? "translateX(100%)" : "translateX(0)",
              opacity: isLoginActive ? 1 : 0,
              zIndex: 2
            }}
          >
            <p>Don't have an account? Sign up now!</p>
            <button
              onClick={this.toggleActiveComponent}
              className={styles.button}
            >
              Go to Sign up
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`${styles.right} ${
            isLoginActive ? styles.inactive : styles.active
          }`}
          style={{
            transform: isLoginActive ? "translateX(-100%)" : "translateX(0)",
            opacity: isLoginActive ? 0 : 1,
            pointerEvents: isLoginActive? "none":"auto"
          }}
        >
          <Register />
          <div
            className={styles.box}
            style={{
              transform: isLoginActive ? "translateX(0)" : "translateX(-100%)",
              opacity: isLoginActive ? 0 : 1,
            }}
          >
            <p>Already have an account? Log in here!</p>
            <button
              onClick={this.toggleActiveComponent}
              className={styles.button}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
