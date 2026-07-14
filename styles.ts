// styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Slate 900
    },
    layout: {
        flex: 1,
        padding: 24,
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
    },
    header: {
        marginBottom: 24,
    },
    titleText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#f8fafc', // Slate 50
        fontFamily: 'Segoe UI',
    },
    subtitleText: {
        fontSize: 14,
        color: '#94a3b8', // Slate 400
        fontFamily: 'Segoe UI',
        marginTop: 4,
    },
    dashboard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 16,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#1e293b', // Slate 800
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155', // Slate 700
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontFamily: 'Segoe UI',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#f8fafc',
        marginTop: 8,
        fontFamily: 'Segoe UI',
    },
    negativeColor: {
        color: '#f43f5e', // Rose 500
    },
    addButton: {
        backgroundColor: '#3b82f6', // Blue 500 (Windows blue accent)
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Segoe UI',
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 24,
    },
    listContent: {
        flexGrow: 1,
        gap: 12,
        paddingBottom: 24,
    },
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    cardLeft: {
        flex: 1,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f8fafc',
        fontFamily: 'Segoe UI',
    },
    dateText: {
        fontSize: 12,
        color: '#64748b', // Slate 500
        marginTop: 4,
        fontFamily: 'Segoe UI',
    },
    cardRight: {
        marginLeft: 16,
    },
    amountText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#f43f5e', // Rose 500
        fontFamily: 'Segoe UI',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
    },
    emptyTextTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#94a3b8',
        fontFamily: 'Segoe UI',
        textAlign: 'center',
    },
    emptyTextSubtitle: {
        fontSize: 14,
        color: '#64748b',
        fontFamily: 'Segoe UI',
        textAlign: 'center',
        marginTop: 8,
    },

    // ── Form styles ──────────────────────────────────────────────
    formOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: 12,
        marginBottom: 24,
        overflow: 'hidden',
    },
    formContainer: {
        backgroundColor: '#1e293b',
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f8fafc',
        fontFamily: 'Segoe UI',
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: '#0f172a',
        borderWidth: 1,
        borderColor: '#334155',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#f8fafc',
        fontFamily: 'Segoe UI',
        marginBottom: 14,
    },
    textInputError: {
        borderColor: '#f43f5e',
    },
    errorText: {
        fontSize: 12,
        color: '#f43f5e',
        fontFamily: 'Segoe UI',
        marginTop: -10,
        marginBottom: 14,
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 4,
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'Segoe UI',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#475569',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: '#94a3b8',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Segoe UI',
    },

    // ── Card / null-state styles ─────────────────────────────────
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descriptionMuted: {
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'italic',
        color: '#64748b',
        fontFamily: 'Segoe UI',
    },
    categoryBadge: {
        backgroundColor: '#1e3a5f',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 6,
    },
    categoryBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#60a5fa',
        fontFamily: 'Segoe UI',
    },
    categoryBadgeMuted: {
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: '#334155',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 6,
    },
    categoryBadgeMutedText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        fontFamily: 'Segoe UI',
        fontStyle: 'italic',
    },
});