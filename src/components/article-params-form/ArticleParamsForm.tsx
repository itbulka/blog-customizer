import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'components/select';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Text } from 'components/text';
import { Separator } from 'components/separator';

type TArticleParamsForm = {
	state: ArticleStateType;
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ state, onChange }: TArticleParamsForm) => {
	const [settingsArticleState, setSettingsArticleSet] = useState({ ...state });
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(settingsArticleState);
	};

	const handleClear = () => {
		setSettingsArticleSet({ ...defaultArticleState });
		onChange({ ...defaultArticleState });
	};

	const handleOpenForm = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={handleOpenForm} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={settingsArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) => {
							setSettingsArticleSet({
								...settingsArticleState,
								fontFamilyOption: selected,
							});
						}}
						title={'Шрифт'}
					/>
					<RadioGroup
						selected={settingsArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) => {
							setSettingsArticleSet({
								...settingsArticleState,
								fontSizeOption: selected,
							});
						}}
						title={'Размер шрифта'}
						name={'font'}
					/>
					<Select
						selected={settingsArticleState.fontColor}
						options={fontColors}
						onChange={(selected) => {
							setSettingsArticleSet({
								...settingsArticleState,
								fontColor: selected,
							});
						}}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={settingsArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) => {
							setSettingsArticleSet({
								...settingsArticleState,
								backgroundColor: selected,
							});
						}}
						title={'Цвет фона'}
					/>
					<Select
						selected={settingsArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) => {
							setSettingsArticleSet({
								...settingsArticleState,
								contentWidth: selected,
							});
						}}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClear} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
