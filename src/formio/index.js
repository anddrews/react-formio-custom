import _Components from 'formiojs/components/Components';
import _FormioForm from 'formiojs/Form';
import Formio from 'formiojs/Formio';
import _Utils from 'formiojs/utils';
import _FormBuilder from 'formiojs/FormBuilder';
import _WebFormBuilder from 'formiojs/WebformBuilder';
import formioComponents from 'formiojs/components'

import components from './components';
import {AppConfig} from '../config';

const {hidden, tabs, textfield, checkbox, select, number, textarea, radio, button} = formioComponents;


Formio.setProjectUrl(AppConfig.projectUrl);
Formio.setBaseUrl(AppConfig.apiUrl);
_Components.setComponents({...components, hidden, tabs, textfield, checkbox, select, number, textarea, radio, button});

export const Components = _Components;
export const FormioForm = _FormioForm;
export const Utils = _Utils;
export const FormBuilder = _FormBuilder;
export const WebFormBuilder = _WebFormBuilder;

export default Formio;
