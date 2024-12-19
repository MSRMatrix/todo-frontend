const DialogWindow = ({message, exampleFunction, setWindow, id, password}) => {
  return (
    <>
      <dialog open>
        <h4>{message}</h4>
        <form method="dialog">
          <button onClick={() => {exampleFunction(id, password), setWindow(false)}}>Yes</button>
          <button onClick={() => {exampleFunction(id, password), setWindow(false)}}>No</button>
        </form>
      </dialog>
    </>
  );
};

export default DialogWindow;