import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Collapse,
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from 'styled-components';

import { ProjectTableHeaderModal } from '~/components/molecules';
import { useAppDispatch } from '~/hooks';
import { IProject, IUsers } from '~/interfaces';
import { removeProject, showDialogEditProject } from '~/store';
interface ProjectRowProps {
  project: IProject;
  owner: IUsers;
}

export const ProjectRow = ({ project, owner }: ProjectRowProps) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const mainContentStyles = {
    color: colors.greyQuaternary,
    fontSize: 12,
    fontWeight: 700,
    borderBottom: open ? `1px solid ${colors.transparent}` : `1px solid ${colors.greenSecondary}`
  };

  const handleDeleteProject = (project: IProject) => {
    dispatch(removeProject(project.id));
  };

  const handleEditProject = (project: IProject) => {
    dispatch(showDialogEditProject(project));
  };

  return (
    <>
      <TableCell colSpan={5} sx={{ p: 0 }}>
        <table
          style={{
            width: '100%',
            fontSize: 0,
            border: 'none',
            borderSpacing: 0,
            borderColor: 'transparent'
          }}
        >
          <ProjectTableHeaderModal />
          <tbody>
            <tr>
              <TableCell sx={mainContentStyles}>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  sx={{ color: colors.greenTertiary, width: 'fit-content' }}
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell sx={mainContentStyles}>{project.name}</TableCell>
              <TableCell sx={mainContentStyles} align='left'>
                {owner?.name || 'unknown'}
              </TableCell>
              <TableCell sx={mainContentStyles} align='center'>
                <Fab
                  onClick={() => handleEditProject(project)}
                  size='small'
                  sx={{
                    zIndex: 1,
                    background: colors.greenTertiary,
                    color: colors.white,
                    '&:hover': { background: colors.greenSecondary }
                  }}
                  aria-label='edit'
                >
                  <EditIcon />
                </Fab>
              </TableCell>
              <TableCell sx={mainContentStyles} align='center'>
                <Fab
                  onClick={() => handleDeleteProject(project)}
                  size='small'
                  color='secondary'
                  aria-label='delete'
                  sx={{
                    zIndex: 1,
                    background: colors.redPrimary,
                    color: colors.white,
                    '&:hover': { background: colors.redPrimary, filter: 'brightness(1.5)' }
                  }}
                >
                  <DeleteIcon />
                </Fab>
              </TableCell>
            </tr>
          </tbody>
        </table>

        <Collapse sx={{ pl: 2 }} in={open} timeout='auto' unmountOnExit>
          <Box>
            <Typography sx={{ ...mainContentStyles, color: colors.greenTertiary, fontSize: 15 }}>
              Description:
            </Typography>
            <Typography sx={{ color: colors.greyQuaternary, fontSize: 12, pr: 3, mb: 3 }}>
              {project?.description ? project.description : 'No description'}
            </Typography>
            <Typography
              gutterBottom
              sx={{ ...mainContentStyles, color: colors.greenTertiary, fontSize: 15 }}
            >
              Owner data
            </Typography>
            <Table size='small' aria-label='purchases'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: `2px solid ${colors.greenTertiary}` }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ borderBottom: `2px solid ${colors.greenTertiary}` }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ borderBottom: `2px solid ${colors.greenTertiary}` }}>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={mainContentStyles}>{owner?.id || 'not have owner id'}</TableCell>
                  <TableCell sx={mainContentStyles}>
                    {owner?.name || 'not have owner name'}
                  </TableCell>
                  <TableCell sx={mainContentStyles}>
                    {owner?.email || 'not have owner email'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
};
