import { GetServerSideProps } from "next";
import React from "react";
import { ServiceApi } from "../../../apis/services";
import { ServiceI } from "../../../interfaces";
import LayoutDashboard from "../../../components/dashboard/LayoutDashboard";
import TableListStaticData from "../../../components/dashboard/clients/TableListStaticData";

const ListUsersByPositionJobPage = ({ title, employees, _id }: ServiceI) => {
  // console.log(props);
  return (
    <LayoutDashboard>
      <h1>{title}</h1>
      <TableListStaticData
        data={employees || []}
        idService={_id || ""}
        offsetSliceValue={employees?.length || 5}
      />
    </LayoutDashboard>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  const { data } = await ServiceApi.get(`/${id}`);
  // console.log(ctx);
  return {
    props: data,
  };
};

export default ListUsersByPositionJobPage;
