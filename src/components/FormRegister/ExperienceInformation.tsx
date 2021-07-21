import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setExperienceInformation } from '@/redux/actions/postActions';
import { Fragment, useState } from 'react';
import { FORM_FIELD_REQUIRED } from '../constants';

const ExperienceInformation = () => {
  const dispatch = useDispatch();
  const { global_information_experience } = useSelector((res: any) => res.state);

  const [idData, setIdData] = useState(1);

  const handleAddNew = () => {
    const id = idData + 1;
    const data = global_information_experience.data;
    let param = {
      id: id,
      company: { label: 'Company', name: 'company', type: 'text', value: '', error: '' },
      title: { label: 'Title', name: 'title', type: 'text', value: '', error: '' },
      start_date: { label: 'Start Date', name: 'start_date', type: 'date', value: '', error: '' },
      end_date: { label: 'End Date', name: 'end_date', type: 'date', value: '', error: '' },
    };

    data.push(param);
    dispatch(setExperienceInformation({ data: data, status: false }));
    setIdData(id);
  };

  const handleDelete = (id: number) => {
    const data = global_information_experience.data;
    const idx = data.findIndex((x: { id: number }) => x.id === id);
    data.splice(idx, 1);
    dispatch(setExperienceInformation({ data: data, status: false }));
  };

  const handleChange = (id: number, e: any) => {
    const data = global_information_experience.data;
    const name = e.target.name;
    const val = e.target.value;

    const index = data.findIndex((x: any) => {
      return x.id === id;
    });

    const jsData = Object.assign({}, data[index]);
    switch (name) {
      case 'company':
        jsData.company.value = val;
        break;
      case 'title':
        jsData.title.value = val;
        break;
      case 'start':
        jsData.start_date.value = val;
        break;
      case 'end':
        jsData.end_date.value = val;
        break;
      default:
        break;
    }

    const dJson = Object.assign([], data);
    dJson[index] = jsData;

    dispatch(setExperienceInformation({ data: dJson, status: false }));
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          <h4 className="mb-0 font-weight-bold text-uppercase">Experience</h4>
        </Card.Header>
        <Card.Body>
          {global_information_experience.data.map((d: any, i: number) => {
            const company = d.company;
            const title = d.title;
            const startDate = d.start_date;
            const endDate = d.end_date;
            return (
              <Fragment key={i}>
                <Card className="mb-3">
                  <Card.Body>
                    <Form id={`form_${d.id}`}>
                      <Row>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={company.name}>
                            <Form.Label>{company.label}</Form.Label>
                            <input
                              className="form-control"
                              type={company.type}
                              name="company"
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {company.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={title.name}>
                            <Form.Label>{title.label}</Form.Label>
                            <input
                              className="form-control"
                              name="title"
                              type={title.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {title.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={startDate.name}>
                            <Form.Label>{startDate.label}</Form.Label>
                            <input
                              className="form-control"
                              name="start"
                              type={startDate.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {startDate.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                        <Col sm={6} xs={12}>
                          <Form.Group className="mb-3" controlId={endDate.name}>
                            <Form.Label>{endDate.label}</Form.Label>
                            <input
                              className="form-control"
                              name="end"
                              type={endDate.type}
                              onChange={(e) => {
                                handleChange(d.id, e);
                              }}
                            />
                            {endDate.error !== '' && <FORM_FIELD_REQUIRED />}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                  {d.id !== 1 && (
                    <Card.Footer className="p-2 text-right">
                      <Button variant="danger" onClick={() => handleDelete(d.id)}>
                        <span className="fa fa-trash mr-2"></span>
                        Delete
                      </Button>
                    </Card.Footer>
                  )}
                </Card>
              </Fragment>
            );
          })}
          <Button className="mt-3" onClick={handleAddNew} variant="primary">
            Add New
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExperienceInformation;
