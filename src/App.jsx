import { ProjectList } from "./components/ProjectList";
import { getLoggedInUser } from "./services/UserService";

function App()
{
  const currentUser = getLoggedInUser();
  return (
    <div style={{ padding: '20px'}}>
      <h1>Moja aplikacja - manageMe</h1>
      <p>Zalogowany użytkownik: {currentUser.name} {currentUser.surname}</p>
      <ProjectList/>
    </div>
  );
}

export default App;