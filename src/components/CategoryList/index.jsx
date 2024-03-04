import { useState, useContext, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Sortable from 'sortablejs/modular/sortable.core.esm.js';

import TaskList from '../TaskList';
import { CategoriesContext } from '../../context/CategoriesContext';

export default function CategoryList() {
  const categories = useContext(CategoriesContext);
  const [value, setValue] = useState('all');
  const [indicator, setIndicator] = useState(null);

  useEffect(() => {
    Sortable.create(document.querySelector("#list [aria-label='list']"), {
      disabled: true,
      group: 'localStorage-example',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },
      },
    });
  }, []);

  useEffect(() => {
    let style = document.createElement('style');
    style.innerHTML = `.indicator { left: ${indicator?.left}px !important; width: ${indicator?.width}px !important }`;
    document.getElementsByTagName('head')[0].appendChild(style);
    document.querySelector('#list .MuiTabs-indicator').classList.add('indicator');
  }, [indicator]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setIndicator({
      left: e.target.offsetLeft,
      width: e.target.offsetWidth,
    });
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} variant='scrollable' scrollButtons='auto' aria-label='list' id='list'>
            <Tab label='All' value='all' onClick={handleClick} />
            {categories.map((category) => {
              return (
                <Tab
                  label={category.name}
                  value={category.name}
                  key={category.id}
                  data-id={category.id}
                  onClick={handleClick}
                />
              );
            })}
          </TabList>
        </Box>
        <TabPanel value='all' sx={{ p: 0, pt: 2 }}>
          <TaskList />
        </TabPanel>
        {categories.map((category) => {
          return (
            <TabPanel value={category.name} sx={{ p: 0, pt: 2 }} key={category.id}>
              <TaskList category={category} />
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}
