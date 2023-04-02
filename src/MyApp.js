import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext(null);


export default function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [stateProp, setStateProp] = useState("Yes");

  /* Commented out.  Was unable to get this function to update context and unable to definitively determine if this is possible. 
    let propValuee = "YES";
    const setPropValuee = (val) => { console.log("setPropValuee: current propValuee is", propValuee, "setting propValuee to ",val); propValuee = val; console.log("setPropValuee: propValuee is now", propValuee)};
    function setPropValuee(val) { console.log("setPropValuee: current propValuee is", propValuee, "setting propValuee to ",val); propValuee = val; console.log("setPropValuee: propValuee is now", propValuee)};
  */

  return (
    <div>

      {console.log("Rendering MyApp...")}

      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          /* Commented out 
          //     propValue: propValuee,
           //    setPropValue: setPropValuee
          // propValuee: propValuee,
          //    setPropValuee
          */
          stateProp: stateProp,
          //setPropValuee: setStateProp - can be used as well 
          setStateProp
        }}
      >
        <Form />
      </CurrentUserContext.Provider>
    </div>
  );
}

function Form({ children }) {



  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {

  const ctx = useContext(CurrentUserContext);

  console.log('LoginButton: ctx is', ctx);

  //setTimeout(() => {ctx.setPropValuee("money")},5000);
  setTimeout(() => { ctx.setStateProp("money") }, 5000);


  if (ctx.currentUser !== null) {
    return <p>You logged in as {ctx.currentUser.name}.</p>;
  }

  return (
    <div>
      {/* <p>propValue in LoginButton is {ctx.propValuee}</p> */}

      <p>propValue in LoginButton is {ctx.stateProp}</p>
      <Button onClick={() => {
        ctx.setCurrentUser({ name: 'Advika' })
      }}>Log in as Advika</Button>

    </div>
  );

}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
