import React, { ChangeEvent, FunctionComponent, useEffect, useMemo } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { Collage, CollageAssetImage } from '../shared/collage';
import { EditorProps, FormObject } from './index.d';
import { translateCollageLayerToForm, translateFormToCollageLayer } from './translator';

type Props = EditorProps & {
  assetImages: Collage['assets']['images'];
  onImageAdded: (image: CollageAssetImage) => void;
};

const ImageEditor: FunctionComponent<Props> = ({ assetImages, layer, onImageAdded, onChange }) => {
  const formik = useFormik({
    initialValues: translateCollageLayerToForm(layer),
    onSubmit: (values) => {
      onChange(translateFormToCollageLayer(values, layer.type));
    }
  });

  useEffect(() => {
    formik.setValues(translateCollageLayerToForm(layer));
  }, [layer]);

  const assetImageIds = useMemo(() => Object.keys(assetImages), [assetImages]);

  const handleClickAddImage = () => {
    /**
     * @todo 코드 개선 필요
     */
    const file = document.createElement('input');
    file.type = 'file';
    document.body.appendChild(file);
    const onChange = () => {
      file.removeEventListener('change', onChange);
      const selectedFile = file.files?.[0];
      if (!selectedFile) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', async () => {
        const id = `image#${Date.now()}`;
        const content = reader.result as string;
        const metadata = {
          mimeType: selectedFile.type,
          title: selectedFile.name,
        };
        onImageAdded({ id, content, metadata });
        formik.values.assetImageId = id;
        await formik.submitForm();
      });
      reader.readAsDataURL(selectedFile);
    };
    file.addEventListener('change', onChange);
    file.click();
    document.body.removeChild(file);
  };

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
          <InputLabel>Asset Image Id</InputLabel>
          <Select
            name="assetImageId"
            onChange={handleChange}
            value={formik.values.assetImageId}
          >
            <MenuItem value="">이미지 선택</MenuItem>
            {assetImageIds.map((id) => (
              <MenuItem
                key={id}
                value={id}
              >
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={handleClickAddImage}
        >
          Add Image
        </Button>

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

export default ImageEditor;
