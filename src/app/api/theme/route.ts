import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest } from 'next/server'
import page from '@/app/(payload)/admin/[[...segments]]/page'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const themeName = searchParams.get('name')

  if (!themeName) return new Response('Theme name required', { status: 400 })

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'themes',
    where: { name: { equals: themeName } },
    depth: 1,
  })

  const theme = result.docs?.[0] as any
  if (!theme)
    return new Response('/* Theme not found */', {
      status: 404,
      headers: { 'Content-Type': 'text/css' },
    })

  // 1. Prepare Font Strings for URL (Replace spaces with +)

  const headingFont = theme.pageTheme.headingFont?.replace(/ /g, '+')
  const bodyFont = theme.pageTheme.bodyFont?.replace(/ /g, '+')

  const importUrl = `@import url('https://fonts.googleapis.com/css2?family=${headingFont}&family=${bodyFont}&display=swap');`

  const modeFromQuery = searchParams.get('mode')
  const mode = modeFromQuery === 'dark' ? 'dark' : 'light'

  // decide text color based on mode
  const textColors = mode === 'dark' ? '#ffffff' : '#000000'

  //   const dynamicVariables = `
  // ${importUrl}

  // :root {
  //   // /* LIGHT */
  //   // --colour1-light: ${theme.colors?.colour1_light};
  //   // --colour2-light: ${theme.colors?.colour2_light};
  //   // --colour3-light: ${theme.colors?.colour3_light};
  //   // --colour4-light: ${theme.colors?.colour4_light};
  //   // --colour5-light: ${theme.colors?.colour5_light};
  //   // --colour6-light: ${theme.colors?.colour6_light};

  //   // /* DARK */
  //   // --colour1-dark: ${theme.colors?.colour1_dark};
  //   // --colour2-dark: ${theme.colors?.colour2_dark};
  //   // --colour3-dark: ${theme.colors?.colour3_dark};
  //   // --colour4-dark: ${theme.colors?.colour4_dark};
  //   // --colour5-dark: ${theme.colors?.colour5_dark};
  //   // --colour6-dark: ${theme.colors?.colour6_dark};

  //   // /* DEFAULT (fallback = LIGHT) */
  //   // --colour1: var(--colour1-light);
  //   // --colour2: var(--colour2-light);
  //   // --colour3: var(--colour3-light);
  //   // --colour4: var(--colour4-light);
  //   // --colour5: var(--colour5-light);
  //   // --colour6: var(--colour6-light);
  // ${vars}

  //   --text-color: #000000;
  //   --link-color: ${theme.linkColor} ;

  //   --btn-primary-bg: ${theme.primaryButton?.background};
  //   --btn-primary-text: ${theme.primaryButton?.['text-colours']};

  //   --btn-secondary-bg: ${theme.secondaryButton?.['background-colours']};
  //   --btn-secondary-text: ${theme.secondaryButton?.['text-colours']};

  //   --font-heading: "${headingFont}";
  //   --font-body: "${bodyFont}";
  // }
  // `

  let dynamicVariables = `
${importUrl}

/* PAGE THEME ONLY */
body {
  --text-color: ${theme?.pageTheme.textColor};
  --bg-color: ${theme?.pageTheme.backgroundColor};
  --container-bg: ${theme?.pageTheme.containerBackground};
  --heading-color: ${theme?.pageTheme.headingColor};

  --font-body: '${theme?.pageTheme.bodyFont}';
  --font-heading: '${theme?.pageTheme.headingFont}';
}

/* GLOBAL VARIABLES (OTHERS) */
:root {
  --navbar-text: ${theme?.navbar.textColor};
  --navbar-bg: ${theme?.navbar.backgroundColor};

  --footer-text: ${theme?.footer.textColor};
  --footer-bg: ${theme?.footer.backgroundColor};

  --btn-fill-text: ${theme.variants?.fill?.textColor};
  --btn-fill-bg: ${theme.variants?.fill?.backgroundColor};

  --btn-outline-text: ${theme.variants?.outline?.textColor};
  --btn-outline-border: ${theme.variants?.outline?.borderColor};
  --btn-outline-bg: ${theme.variants?.outline?.backgroundColor};
}
`
  if (theme.customThemes?.length) {
    theme.customThemes.forEach((t: any) => {
      if (!t.className) return

      dynamicVariables += `
.${t.className} {
  ${t.textColor ? `--text-color: ${t.textColor}; --heading-color: ${t.textColor};` : ''}
  ${t.backgroundColor ? `--bg-color: ${t.backgroundColor};` : ''}
  ${t.descriptionColor ? `--description-color: ${t.descriptionColor};` : ''}
}
`
    })
  }

  return new Response(dynamicVariables, {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'no-cache',
    },
  })
}
