import { Select } from 'antd';
import { i18n } from 'next-i18next';
import { useContext } from 'react';
import { I18nContext } from 'react-i18next';

const { Option } = Select;


const LanguageSwitcher = () => {

    function handleChange(value) {
            i18n.changeLanguage(value);            
            console.log(value);
      }

      const { i18n: {language}} = useContext(I18nContext);

      
      console.log(language);

      return(
          <>
             <Select defaultValue={language} style={{ width: 120 }} onChange={handleChange}>
                <Option value="en" onChange={() => i18n.changeLanguage('en')}>En</Option>
                <Option value="ro" onChange={() => i18n.changeLanguage('ro')}>Ro</Option>  
                <Option value="de" onChange={() => i18n.changeLanguage('de')}>De</Option>                             
            </Select>
          </>
      )

}

export default LanguageSwitcher;