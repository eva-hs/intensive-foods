import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { columns, data } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) =>
              column.path === "name" ? (
                <td key={column.path || column.key}>
                  <Link to={`/intensive-foods/foods/${item._id}`}>
                    {this.renderCell(item, column)}
                  </Link>
                </td>
              ) : (
                <td key={column.path || column.key}>
                  {this.renderCell(item, column)}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
