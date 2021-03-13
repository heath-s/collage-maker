import React, { ChangeEvent, FunctionComponent, useEffect } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { EditorProps as Props, FormObject } from './index.d';
import { translateCollageLayerToForm, translateFormToCollageLayer } from './translator';

const GroupEditor: FunctionComponent<Props> = ({ layer, onChange }) => {
  const formik = useFormik({
    initialValues: translateCollageLayerToForm(layer),
    onSubmit: (values) => {
      onChange(translateFormToCollageLayer(values, layer.type));
    }
  });

  useEffect(() => {
    formik.setValues(translateCollageLayerToForm(layer));
  }, [layer]);

  const handleChange = async (ev: ChangeEvent<unknown>) => {
    formik.handleChange(ev);
    await formik.submitForm();
  };

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <TextField
            name="title"
            label="Title"
            onChange={handleChange}
            value={formik.values.title}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="position.left"
            label="Left"
            onChange={handleChange}
            type="number"
            value={(formik.values.position as FormObject).left}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="position.top"
            label="Top"
            onChange={handleChange}
            type="number"
            value={(formik.values.position as FormObject).top}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="dimension.width"
            label="Width"
            onChange={handleChange}
            type="number"
            value={(formik.values.dimension as FormObject).width}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="dimension.height"
            label="Height"
            onChange={handleChange}
            type="number"
            value={(formik.values.dimension as FormObject).height}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            name="transform.rotate"
            label="Rotate"
            onChange={handleChange}
            type="number"
            value={(formik.values.transform as FormObject).rotate}
          />
        </FormControl>
      </form>
    </section>
  );
};

export default GroupEditor;
