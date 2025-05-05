import React from "react";

export default function PaginationComponent(props) {
  const { total, limit, setPage } = props;
  const arrayValues: number[] = [];
  const pagesNumber = parseInt(total) / parseInt(limit);

  for (let i = 0; i < pagesNumber; i++) {
    arrayValues.push(i + 1);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {arrayValues.map((i) => {
          return (
            <li className="page-item" key={i}>
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  setPage(i);
                }}
              >
                {i}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
