import React from "react"
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Tooltip, Menu, MenuItem } from "@material-ui/core"
import {
  Language as LanguageIcon,
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  Delete as ResetIcon,
} from "@material-ui/icons"
import { useIntl } from "react-intl"
import { usePdfManager } from "../pdfManager"
import Logo from "./logo.svg"

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "32px",
    margin: `0px ${theme.spacing(1)}px`,
    marginRight: "auto",
  },
}))

const TopBar = ({ locales, locale, setLocale }) => {
  const classes = useStyles()
  const intl = useIntl()

  const { downloadDestination, triggerUpload, reset } = usePdfManager()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }
  const selectLocale = (l) => () => { setLocale(l); handleClose() }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <img src={Logo} alt="m-pdf" className={classes.logo} />
        <IconButton onClick={triggerUpload}>
          <Tooltip title={intl.formatMessage({ defaultMessage: "Upload sources" })}>
            <UploadIcon />
          </Tooltip>
        </IconButton>
        <IconButton onClick={downloadDestination}>
          <Tooltip title={intl.formatMessage({ defaultMessage: "Download destination" })}>
            <DownloadIcon />
          </Tooltip>
        </IconButton>
        <IconButton onClick={reset}>
          <Tooltip title={intl.formatMessage({ defaultMessage: "Delete sources and destination" })}>
            <ResetIcon />
          </Tooltip>
        </IconButton>
        <div>
          <IconButton aria-controls="language-selector" aria-haspopup="true" onClick={handleOpen}>
            <Tooltip title={intl.formatMessage({ defaultMessage: "Change language" })}>
              <LanguageIcon/>
            </Tooltip>
          </IconButton>
          <Menu
            id="language-selector"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {locales.map(localeObject => (
              <MenuItem
                key={localeObject.locale}
                onClick={selectLocale(localeObject.locale)}
                selected={localeObject.locale === locale}
              >
                {localeObject.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
