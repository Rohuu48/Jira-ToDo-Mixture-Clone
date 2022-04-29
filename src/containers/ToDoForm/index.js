import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import FormManager from "../../components/FormManager";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { setToDo } from "actions/todos";
import "./toDoForm.scss";
import { useState } from "react";
import { ToDoSchema } from "common/validationSchema";

const ToDoForm = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const [selectedVal, setSelectedVal] = useState();

  const allUsers = useSelector((state) => state.auth?.allUsers || []);
  const isLoading = useSelector((state) => state.todos?.loading || false);

  const callback = () => {
    toggleModal();
    showAlert({ status: "success", description: "To do created" });
  };

  const onSubmit = (values) => {
    dispatch(setToDo({ ...values, assignee: selectedVal }, callback));
  };

  const onSelectChange = (event) => {
    const { target } = event;

    // note: 'select-multiple' for multi select
    if (target.type === "select-one") {
      const selectValue = target.selectedOptions[0].value;
      setSelectedVal(selectValue);
    }
  };
  return (
    <FormManager
      initialValues={{}}
      validationSchema={ToDoSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ formik, errorSection }) => (
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              name="title"
              type="text"
              variant="outline"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {errorSection("title")}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter description"
              size="sm"
            />
            {errorSection("description")}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="assignee">Assign To</FormLabel>
            <Select
              id="assignee"
              name="assignee"
              value={selectedVal}
              onChange={onSelectChange}
              placeholder="Select assignee"
            >
              {allUsers.map((user) => (
                <option value={user?.id}>
                  {user.fullName}({user.username})
                </option>
              ))}
            </Select>
            {errorSection("assignee")}
          </FormControl>
          <Button
            style={{ margin: "20px 0 20px auto" }}
            type="submit"
            colorScheme="teal"
            variant="outline"
          >
            {isLoading ? (
              <Spinner data-testid="activity_indicator" color="white.500" />
            ) : (
              "Create"
            )}
          </Button>
        </VStack>
      )}
    </FormManager>
  );
};

export default ToDoForm;
