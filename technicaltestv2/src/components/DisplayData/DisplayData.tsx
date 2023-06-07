import React from "react";
import { MetalBand } from "./DisplayData.d";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

const DisplayData: React.FC<{filter: string, data: MetalBand[]}> = ({filter, data}) => {
    console.log(filter);
    const columns: ColumnsType<MetalBand> = [
      {
        title: 'Band Name',
        dataIndex: 'band_name',
        key: 'band_name',
      },
      {
        title: 'Fans',
        dataIndex: 'fans',
        key: 'fans',
      },
      {
        title: 'Formed',
        dataIndex: 'formed',
        key: 'formed',
      },
      {
        title: 'Origin',
        key: 'origin',
        dataIndex: 'origin',
      },
      {
        title: 'Split',
        key: 'split',
        dataIndex: 'split',
      },
      {
        title: 'Style',
        key: 'style',
        dataIndex: 'style',
        render: (_, { style }) => (
          <>
            {style?.map((styled) => {
              return (
                <Tag key={styled}>
                  {styled.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];
  return (
    <Table columns={columns} dataSource={data}></Table>
  );
};

export default DisplayData;
