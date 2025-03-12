import './FooterCatalogLeftPath.component.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom';


function FooterCatalogLeftPath() {
	const [value, setValue] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
	return(
		<>
<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="каталог авто" value="1" />
            <Tab label="подробнее" value="2" />
            <Tab label="карта сайта" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
					<div className="footer-tab_panel-one">
						<ul className="panel-lists">
							<li className="panel-lists_item">
							<Link to={"/"}>Kia</Link>
							</li>
							<li className="panel-lists_item">
								<Link to={"/"}>Hyundai</Link>
							</li>
							<li className="panel-lists_item">
								<Link to={"/"}>Skoda</Link>
							</li>
							<li className="panel-lists_item">
								<Link to={"/"}>Volkswagen</Link>
							</li>
							<li className="panel-lists_item">
								<Link to={"/"}>Toyota</Link>
							</li>
							<li className="panel-lists_item">
								<Link to={"/"}>Brilliance</Link>
							</li>
						</ul>
						<ul className="panel-lists"><li className="panel-lists_item">
							<Link to={"/"}>Changan</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Chery</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>CheryExeed</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Chevrolet</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Citroen</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Datsun</Link>
						</li></ul>
						<ul className="panel-lists"><li className="panel-lists_item">
							<Link to={"/"}>Dongfeng</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>DW Hower</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>FAW</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Ford</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Foton</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Geely</Link>
						</li></ul>
						<ul className="panel-lists"><li className="panel-lists_item">
							<Link to={"/"}>Great Wall</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Haima</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Haval</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Honda</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>JAC</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Lada</Link>
						</li></ul>
						<ul className="panel-lists"><li className="panel-lists_item">
							<Link to={"/"}>Ravon</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Renault</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>SsangYong</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Suzuki</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>UAZ</Link>
						</li>
						<li className="panel-lists_item">
							<Link to={"/"}>Zotye</Link>
						</li></ul>
					</div>
				</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
		</>
	)
}
export default FooterCatalogLeftPath