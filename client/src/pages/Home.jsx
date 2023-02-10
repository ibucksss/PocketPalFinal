import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import Spinner from "../components/Spinner";
import AddEditTransaction from "../components/AddEditTransaction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message, Table, Select, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import Analytics from "../components/Analytics";
const { Option } = Select;
const { RangePicker } = DatePicker;
const Home = () => {
  const [showAddEditTransactionModel, setShowAddEditTransactionModel] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [type, setType] = useState("all");
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("pocketpal-user"));

      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <Moment format="MM-DD-YYYY">{date}</Moment>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => <span>${amount}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex">
            <EditOutlined
              className="edit-btn"
              onClick={() => {
                setSelectedEditItem(record);
                setShowAddEditTransactionModel(true);
              }}
            />
            <DeleteOutlined
              className="mx-3 delete-btn"
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex row-1">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select
              style={{ width: 150 }}
              value={frequency}
              onChange={(value) => setFrequency(value)}
            >
              <Option value="7">This Week</Option>
              <Option value="30">This Month</Option>
              <Option value="365">This Year</Option>

              <Option value="custom">Custom</Option>
            </Select>
            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                ></RangePicker>
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select
              style={{ width: 150 }}
              value={type}
              onChange={(value) => setType(value)}
            >
              <Option value="all">All</Option>
              <Option value="Income">Income</Option>
              <Option value="Expense">Expenses</Option>
            </Select>
          </div>
        </div>
        <div className="d-flex row-2">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModel(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="table-anatytics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData}></Table>
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>
      {showAddEditTransactionModel && (
        <AddEditTransaction
          getTransactions={getTransactions}
          showAddEditTransactionModel={showAddEditTransactionModel}
          selectedEditItem={selectedEditItem}
          setShowAddEditTransactionModel={setShowAddEditTransactionModel}
          setSelectedEditItem={setSelectedEditItem}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
