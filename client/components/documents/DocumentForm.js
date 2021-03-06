import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const DocumentForm = ({ document, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h5>Create/Update a Document</h5>
      <Row>
        <Input
          placeholder="Title"
          s={12}
          validate
          name="title"
          onChange={onChange}
          value={document.title}
          error={errors.title}
          id="title"
        />
        <Input
          placeholder="Content"
          s={12}
          validate
          type="textarea"
          name="content"
          onChange={onChange}
          value={document.content}
          error={errors.content}
          id="content"
        />
        <Input
          s={12}
          validate
          type="select"
          onChange={onChange}
          value={document.access}
          name="access"
          error={errors.access}
          id="access"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="role">Role</option>
        </Input>

        <Input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn waves-effect waves-light blue"
          onClick={onSave}
        />
      </Row>
    </form>
  );
};

DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  errors: React.PropTypes.object.isRequired,
};

export default DocumentForm;
