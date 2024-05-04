"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import { Col, Row } from "antd";

const Dashboard = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getUserCountByCity = () => {
    const userCountByCity: any = {};

    users.forEach((user: any) => {
      if (user.address && user.address.city) {
        userCountByCity[user.address.city] =
          (userCountByCity[user.address.city] || 0) + 1;
      }
    });

    return Object.entries(userCountByCity).map(([city, count]) => ({
      city,
      count,
    }));
  };

  const getUserCountByCompanySize = () => {
    const userCountByCompanySize = {
      Small: 0,
      Medium: 0,
      Large: 0,
    };

    users.forEach((user: any) => {
      if (user.company && user.company.bs) {
        const companySize = user.company.bs.toLowerCase();
        if (companySize.includes("small")) {
          userCountByCompanySize.Small += 1;
        } else if (companySize.includes("medium")) {
          userCountByCompanySize.Medium += 1;
        } else if (companySize.includes("large")) {
          userCountByCompanySize.Large += 1;
        }
      }
    });

    return Object.entries(userCountByCompanySize).map(([size, count]) => ({
      size,
      count,
    }));
  };

  const getUserStatusDistribution = () => {
    const activeUsers = users.filter(
      (user: any) =>
        user.address && user.address.geo && user.address.geo.lat > 0
    );
    const inactiveUsers = users.filter(
      (user: any) => !activeUsers.includes(user)
    );
    const statusDistribution = [
      { name: "Active", value: activeUsers.length },
      { name: "Inactive", value: inactiveUsers.length },
    ];
    return statusDistribution;
  };

  const getUserCountOverTime = () => {
    const userCountOverTime = users.reduce((acc: any, user: any) => {
      const date = user.createdAt?.slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(userCountOverTime).map(([date, count]) => ({
      date,
      count,
    }));
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      <Row gutter={24}>
        <Col span={12}>
          <div>
            <h2>User Count by City</h2>
            <BarChart width={600} height={300} data={getUserCountByCity()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h2>User Count by Company Size</h2>
            <BarChart
              width={600}
              height={300}
              data={getUserCountByCompanySize()}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <div>
            <h2>User Status Distribution</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={getUserStatusDistribution()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h2>User Count Over Time</h2>
            <LineChart width={600} height={300} data={getUserCountOverTime()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
