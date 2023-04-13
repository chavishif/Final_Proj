import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../../styles/details.css"

type Category = {
  name: string;
  path: string;
};

type Props = {
  collapseItems: Category[];
};

function SearchBox({ collapseItems }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword) {
      const category = collapseItems.find(
        (item) => item.name.toLowerCase() === keyword.toLowerCase()
      );
      if (category) {
        navigate(category.path);
      } else {
        alert('no such category');
      }
    }
  };
 
  

  useEffect(() => {
    const category = collapseItems.find(
      (item) => item.name.toLowerCase() === keyword.toLowerCase()
    );
    if (category) {
      navigate(category.path);
    }
  }, [collapseItems]);


  
  return (
    <Form style={{ backgroundColor: "white" }} onSubmit={submitHandler} className="p-2 border-0">
    <div className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success"  className="custom-button">
        Search
      </Button>
    </div>
  </Form>
);
  };

export default SearchBox;