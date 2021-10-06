import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo';
import {
  Heading,
  Paragraph,
  BlockQuote,
  Code,
  ToolsIcon,
} from '@smallstep/step-ui';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Hidden,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import contents from '../../../pages/docs/contents.yaml';
// import DocsNav from './DocsNav';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import HN from './HN';
import Li from './Li';
import Em from './Em';
import Strong from './Strong';
import Image from './Image';
import CodeBlock from './CodeBlock';
import Link from './Link';
import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';
import ContentLink from './ContentLink';

// TODO wire up yaml contents
const contents = [];

const CTA_ICONS = {
  ToolsIcon: <ToolsIcon />,
};

const DocsLayout = ({ location, pageContext, toc, children }) => {
  const theme = useTheme();
  const [submenus, setSubmenus] = useState({});

  const {
    title,
    html_title: htmlTitle,
    description,
    unfurl,
    cta,
  } = pageContext.frontmatter;

  // TODO useStaticQuery
  const siteUrl = '';
  const { pathname } = { location };

  const robotsTitle = htmlTitle || title.replace(/`/g, '');

  useEffect(() => {
    if (!submenus) {
      return;
    }

    // expand all submenu for current doc's base path
    Object.keys(contents).forEach((product) => {
      if (pathname.indexOf(submenus[product].href) === 0) {
        submenus[product].expand();
      }
    });
  }, [submenus]);

  const url = `${siteUrl}${location.pathname}`;

  return (
    <>
      <GatsbySeo
        type="article"
        title={robotsTitle}
        description={description}
        openGraph={{
          title,
          description,
          url,
          type: 'article',
          images: [],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <ArticleJsonLd
        url={url}
        headline={robotsTitle}
        images={[]}
        authorName="Smallstep"
        publisherName="Smallstep"
        publisherLogo="https://smallstep.com/uploads/smallstep_tm_full_rust.svg"
        description={description}
      />

      <Grid
        container
        spacing={2}
        style={{
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          xl={3}
          /* TODO makeStyles */
          /* css={css` */
          /*   border-right: 1px solid ${theme.palette.divider}; */
          /*   ${theme.breakpoints.up('md')} { */
          /*     display: flex; */
          /*     justify-content: flex-end; */
          /*   } */
          /* `} */
        >
          <Hidden mdUp>
            <Box m={2}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Heading variant="h5" mb={0}>
                    Menu
                  </Heading>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box width="100%">{/* <DocsNav /> */}</Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          </Hidden>

          <Hidden smDown>
            <Box maxWidth="340px" pl={4} pr={2} py={4}>
              {/* <DocsNav submenusRef={(ref) => setSubmenus(ref)} /> */}
            </Box>
          </Hidden>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          xl={6}
          style={{
            marginTop: theme.spacing(1),
          }}
        >
          <div
          /* TODO makeStyles */
          /* css={css` */
          /*   max-width: ${theme.breakpoints.values.md}px; */
          /*   padding: 0 ${theme.spacing(2)}px; */
          /*   ${theme.breakpoints.up('md')} { */
          /*     padding: ${theme.spacing(4)}px ${theme.spacing(6)}px; */
          /*   } */
          /* `} */
          >
            <Grid container>
              <Grid item xs={12} sm={cta ? 8 : 12}>
                {title && (
                  <Box mb={2}>
                    <Heading variant="h2" component="h1">
                      {title
                        .split('`')
                        .map((chunk, i) =>
                          i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                        )}
                    </Heading>
                  </Box>
                )}
              </Grid>
              {cta && (
                <Grid item xs={12} sm={4}>
                  <ContentLink tile icon={CTA_ICONS[cta.icon]} href={cta.path}>
                    {cta.text
                      .split('`')
                      .map((chunk, i) =>
                        i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                      )}
                  </ContentLink>
                </Grid>
              )}
            </Grid>

            {children}

            {cta && (
              <Box mt={6}>
                <ContentLink tile icon={CTA_ICONS[cta.icon]} href={cta.path}>
                  {cta.text
                    .split('`')
                    .map((chunk, i) =>
                      i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
                    )}
                </ContentLink>
              </Box>
            )}
          </div>
        </Grid>

        {/* TODO wire this up for cli reference docs */}
        <Hidden lgDown>
          {toc && (
            <Grid
              item
              xl={3}
              /* TODO makeStyles */
              /* css={css` */
              /*   border-left: 1px solid ${theme.palette.divider}; */
              /*   ${theme.breakpoints.up('md')} { */
              /*     display: flex; */
              /*     justify-content: flex-start; */
              /*   } */
              /* `} */
            >
              <Box my={4} mx={2}>
                {toc}
              </Box>
            </Grid>
          )}
        </Hidden>
      </Grid>
    </>
  );
};

DocsLayout.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  toc: PropTypes.node,
  children: PropTypes.node.isRequired,
};

DocsLayout.defaultProps = {
  toc: null,
};

export default DocsLayout;
