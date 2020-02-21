import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

const AddBook = ({ authors, addedBook }) => {
  const displayAuthors = () => {
    if (authors.loading) {
      return <option disabled>Loading Authors..</option>;
    } else {
      return authors.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const [form, setForm] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addedBook({
      variables: {
        name: form.name,
        genre: form.genre,
        authorId: form.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id='add-book' onSubmit={e => onSubmit(e)}>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' name='name' onChange={e => onChange(e)} />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input type='text' name='genre' onChange={e => onChange(e)} />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select name='authorId' onChange={e => onChange(e)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'authors' }),
  graphql(addBookMutation, { name: 'addedBook' })
)(AddBook);
