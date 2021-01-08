import './GeoInput.scss';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { Button, Header, Input } from 'semantic-ui-react';
import { Modal } from '../../Modal/Modal';
import { GEO_ID_LENGTH, getText } from '../../../Constants/constants';

const marginStyle = { marginTop: 10, marginBottom: 10 };
interface IGeoInputProps {
  onClose?: () => void;
  onAdd?: (geoId: string) => void;
}

export const GeoInput: FunctionComponent<IGeoInputProps> = ({
  onClose = () => {},
  onAdd = () => {},
}) => {
  const [geoId, setGeoId] = useState('532367811');
  const onChange = useCallback((e, data) => {
    const isDigit = data.value.slice(-1).match(/[0-9]/);
    if (isDigit && data.value.length <= GEO_ID_LENGTH) {
      setGeoId(data.value);
    }
  }, []);
  const onAddValue = useCallback(() => {
    onAdd(geoId);
  }, [onAdd, geoId]);
  return (
    <Modal>
      <div className={'geo-input'}>
        <Button className={'close-button'} circular icon={'close'} primary onClick={onClose} />
        <Header style={marginStyle} as="h3">
          {getText('inputGeoId')}
        </Header>
        <Input
          style={marginStyle}
          size={'huge'}
          loading={false}
          focus
          placeholder="Locator Id..."
          onChange={onChange}
          value={geoId}
        />
        <Button style={marginStyle} primary onClick={onAddValue}>
          {getText('Add')}
        </Button>
      </div>
    </Modal>
  );
};
