import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const Popup = ({
  open,
  trash,
  handleOpen,
  children,
  btnTitle,
  popupTitle,
  draft,
  btnFunc,
}) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{popupTitle}</DialogHeader>
      <DialogBody>{children}</DialogBody>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <Button
            variant={trash ? "gradient" : "text"}
            color={trash ? "green" : "red"}
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <div className={`flex ${draft ? "gap-x-5" : ""}`}>
            {draft && (
              <Button
                variant="gradient"
                color="yellow"
                onClick={() => btnFunc("Draft")}
              >
                <span>Draft</span>
              </Button>
            )}
            <Button
              variant={trash ? "text" : "gradient"}
              color={trash ? "red" : "green"}
              type="submit"
              onClick={draft ? () => btnFunc("Publish") : btnFunc}
            >
              <span>{btnTitle}</span>
            </Button>
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default Popup;
