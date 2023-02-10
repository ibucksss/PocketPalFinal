import { React, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
const { Option } = Select;
const AddEditTransaction = ({
  showAddEditTransactionModel,
  setShowAddEditTransactionModel,
  selectedEditItem,
  getTransactions,
  setSelectedEditItem,
}) => {
  //State for loading Spinner
  const [loading, setLoading] = useState(false);
  //Navigation to other pages
  const navigate = useNavigate(true);
  //Runs after user submits modal for new transaction or for edit
  const onFinish = async (values) => {
    //Try catch block
    try {
      //user set to local storage user
      const user = JSON.parse(localStorage.getItem("pocketpal-user"));
      setLoading(true);
      if (selectedEditItem) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: selectedEditItem._id,
        });
        //getTrancactions function runs to re-render components with updated info
        getTransactions();
        message.success("Transaction Updated Succesfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction Added Succesfully");
      }
      setShowAddEditTransactionModel(false);
      setSelectedEditItem(null);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedEditItem ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModel}
      onCancel={() => setShowAddEditTransactionModel(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedEditItem}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Option value="Income">Income</Option>
            <Option value="Expense">Expense</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            <Option value="Salary">Salary</Option>
            <Option value="Freelance">Freelance</Option>
            <Option value="Food">Food</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Travel">Travel</Option>
            <Option value="Education">Education</Option>
            <Option value="Medical">Medical</Option>
            <Option value="Tax">Tax</Option>
            <Option value="Insurance">Insurance</Option>
            <Option value="Investment">Investment</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date"></Input>
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item label="Description" name="Description">
          <Input type="text"></Input>
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
