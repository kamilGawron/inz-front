import React from "react";

import styled from "styled-components";
import AdminLayout from "../admin/AdminPanelLayout";
import DailyCalendarComponent from "../admin/DailyCalendarComponent";

const ConfigurePageTitle = styled.h2`
  text-align: center;
  font-weight: 400;
`;
const AdminPanel = function () {
  return (
    <AdminLayout>
      <ConfigurePageTitle>Aktualności</ConfigurePageTitle>
      <DailyCalendarComponent />
    </AdminLayout>
  );
};

export default AdminPanel;
