import { cache } from 'react';
import type { Session } from '../migrations/00007-sessions';
import type { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

export const getNotes = cache(async (sessionToken: string) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = notes.user_id
        AND expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getNote = cache(async (sessionToken: string, noteId: number) => {
  const [note] = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = notes.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      notes.id = ${noteId}
  `;
  return note;
});

export async function selectNoteExists(noteId: Note['id']) {
  const [record] = await sql<{ exists: boolean }[]>`
    SELECT
      EXISTS (
        SELECT
          TRUE
        FROM
          notes
        WHERE
          id = ${noteId}
      )
  `;

  return Boolean(record?.exists);
}

export const createNote = cache(
  async (
    sessionToken: Session['token'],
    title: string,
    textContent: string,
  ) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (user_id, title, text_content) (
          SELECT
            sessions.user_id,
            ${title},
            ${textContent}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        notes.*
    `;

    return note;
  },
);
