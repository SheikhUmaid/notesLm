import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { Cached } from '@mui/icons-material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import styled from '@mui/material/styles/styled'
import GitHubIcon from '@mui/icons-material/GitHub'
import MuiLink from '@mui/material/Link'
import Divider from '@mui/material/Divider'

import Logo from 'img/logo.svg?react'

import { Form, Main } from 'components/Elements'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { EnhancedConnectivityControl } from 'components/EnhancedConnectivityControl'
import { SettingsContext } from 'contexts/SettingsContext'
import { routes } from 'config/routes'
import { RoomNameType } from 'lib/RoomNameGenerator'

import { isEnhancedConnectivityAvailable } from '../../config/enhancedConnectivity'

import { useHome } from './useHome'
import { EmbedCodeDialog } from './EmbedCodeDialog'
import { CommunityRoomSelector } from './CommunityRoomSelector'

const StyledLogo = styled(Logo)({})

export interface HomeProps {
  userId: string
}

export function Home({ userId }: HomeProps) {
  const theme = useTheme()
  const { updateUserSettings, getUserSettings } = useContext(SettingsContext)
  const { isEnhancedConnectivityEnabled } = getUserSettings()
  const {
    roomName,
    roomNameType,
    showEmbedCode,
    handleRoomNameChange,
    handleRoomNameTypeChange,
    regenerateRoomName,
    handleFormSubmit,
    handleJoinPublicRoomClick,
    handleJoinPrivateRoomClick,
    handleGetEmbedCodeClick,
    handleEmbedCodeWindowClose,
    isRoomNameValid,
  } = useHome()

  const handleIsEnhancedConnectivityEnabledChange = (
    _event: React.ChangeEvent<{}>,
    newIsEnhancedConnectivityEnabled: boolean
  ) => {
    updateUserSettings({
      isEnhancedConnectivityEnabled: newIsEnhancedConnectivityEnabled,
    })
  }

  return (
    <Box className="Home">
      <EmbedCodeDialog
        showEmbedCode={showEmbedCode}
        handleEmbedCodeWindowClose={handleEmbedCodeWindowClose}
        roomName={roomName}
      />
      <Main
        sx={{
          maxWidth: theme.breakpoints.values.md,
          mt: 3,
          mx: 'auto',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Link to={routes.ABOUT} aria-label="Go to About page">
          <StyledLogo
            sx={{
              px: 0.5,
              pb: 2,
              mx: 'auto',
              maxWidth: theme.breakpoints.values.sm,
            }}
          />
        </Link>
        <Form
          onSubmit={handleFormSubmit}
          sx={{ maxWidth: theme.breakpoints.values.sm, mx: 'auto' }}
        >
          <Typography sx={{ mb: 2 }}>
            Your username:{' '}
            <PeerNameDisplay paragraph={false} sx={{ fontWeight: 'bold' }}>
              {userId}
            </PeerNameDisplay>
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="Notebook name (generated on your device)"
              variant="outlined"
              value={roomName}
              onChange={handleRoomNameChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="Regenerate room id"
                    onClick={regenerateRoomName}
                    size="small"
                  >
                    <Cached />
                  </IconButton>
                ),
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } },
              }}
              size="medium"
            />
          </FormControl>
          <Box sx={{ mt: 2, mb: 2 }}>
            <ToggleButtonGroup
              value={roomNameType}
              exclusive
              onChange={handleRoomNameTypeChange}
              aria-label="room name type"
              size="small"
            >
              <ToggleButton value={RoomNameType.UUID} aria-label="UUID">
                UUID
              </ToggleButton>
              <ToggleButton
                value={RoomNameType.PASSPHRASE}
                aria-label="Passphrase"
              >
                Passphrase
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleJoinPublicRoomClick}
              sx={{
                marginTop: 2,
              }}
              disabled={!isRoomNameValid}
            >
              Create Notebook
            </Button>
            {/* <Button
              variant="contained"
              onClick={handleJoinPrivateRoomClick}
              sx={{
                marginTop: 2,
                marginLeft: 2,
              }}
              disabled={!isRoomNameValid}
            >
              How to use?
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGetEmbedCodeClick}
              sx={{
                marginTop: 2,
                marginLeft: 2,
              }}
              disabled={!isRoomNameValid}
            >
              Share Chats
            </Button>
          </Box>
        </Form>
      </Main>
      <Box component="section" aria-label="Additional options and information">
        <Divider sx={{ my: 2 }} />
        <Box maxWidth={theme.breakpoints.values.sm} mx="auto" px={2}>
          <CommunityRoomSelector />
        </Box>
        {isEnhancedConnectivityAvailable && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box maxWidth={theme.breakpoints.values.sm} mx="auto" px={2}>
              <EnhancedConnectivityControl
                isEnabled={isEnhancedConnectivityEnabled}
                onChange={handleIsEnhancedConnectivityEnabledChange}
                showSecondaryColor={true}
              />
            </Box>
          </>
        )}
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            maxWidth: theme.breakpoints.values.sm,
            mx: 'auto',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography variant="body1">
            NotesLM is a smart web app that helps students turn long study
            material into easy, digestible learning content. It can summarize
            notes, generate quizzes, create flashcards, and even provide audio
            summaries for quick revision.
          </Typography>
        </Box>
        <Box
          component="footer"
          sx={{
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
      </Box>
    </Box>
  )
}
